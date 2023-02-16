# Overview
이 문서는 MAuthWallet 이 갖추어야 할 최소한의 요구사항을 기술한다.

MAuthWallet 은 MDL, ARCANEX 상의 자산을 관리하기 위하여 개발되는 모바일 앱 형태의 월렛 이다.

일반적인 월렛 어플리케이션은, 
1. 계정(지갑) 생성
2. 자산 확인
3. 자산 전송
4. 전송 내역 확인
을 기본 기능으로 제공한다.

MAuthWallet 역시 위 기본 기능을 제공함과 동시에, ARCANEX 의 합의 알고리즘인 DPoS 의 특성에 따른 추가 기능과, 
하이퍼렛지 기반의 MDL 상에서의 위 기본 기능을 함께 제공하도록 구현되어야 한다.

이러한 MAuthWallet 의 기능은 사용자 인증 용도로 개발된 MAuth App의 기능을 확장하는 형태로 개발 된다. 
즉 MAuth App 에 아래 기술되는 월렛 기능을 추가 구현 하여 MAuthWallet 을 개발 한다.

---

## Clear Confidential Data
암호화를 수행하는데 있어서 절대 외부로 노출되어서는 안되는 기밀 데이터(Confidential Data)는 사용 직후 바로 폐기되어야 한다.  
MAuthWallet 에서 다루는 Confidential Data 는 다음과 같다.

- **PrivateKey** : PublicKey에 대응되는 PrivateKey.
- **SecretKey** : 대칭키 암호화 알고리즘에서 사용되는 암복호화 키.  
  디바이스의 보안영역을 사용하면 MAuthWallet 에서 직접 다루지 않을 수도 있다.
- **Passphrase** : SecretKey 를 유도하기 위하여 사용자가 입력하는 데이터. (e.g. 사용자 비밀번호)

위와 같은 Confidential Data 가 메모리상에 존재하는 시간은 최소화 되어야 하며, 사용 완료 즉시 메모리상에서 폐기 되어야 한다.  
**메모리상에서 폐기**란 해당 데이터가 점유했던 모든 메모리 영역을 `0x00`로 초기화 함을 의미한다.

!!! note
    Programming Language, VM 등 에서 제공하는 Garbage Collection 에 의존하지 마라.

!!! warning
    Confidential Data 가 함수의 파라메터로 사용되는 경우, 보다 특별한 주의가 필요하다.  
    예를 들어 다음과 같은 코드를 살펴보자면,  
    slice 가 아닌 array 를 요구하는 함수 `B`에 전달할 인자 `passA` 를 구성하고,
    함수 `B` 호출후 더이상 사용이 완료되었기에 `passA`와 `pass` 를 폐기(`clearBytes`호출) 하였다.  
    그러나 golang 의 array 는 call by value 로 전달 되기 때문에,
    `passA`와 `passB`는 각자 서로 다른 메모리 영역을 갖고 있다. 
    때문에 `passB`의 메모리 영역에는 여전히 Confidential Data 가 남아 있게 된다.

```
    func A(pass []byte) {
        var passA [32]byte
        copy(passA[:], pass)
        
        B(passA)
        
        clearFunc(pass)
        clearFunc(passA[:])
    }
    
    func B(passB [32]byte) {
        ...
    }

    func clearFunc(d []byte) {
        for i, _ := range d {
            d[i] = byte(0x00)
        }
    }
```

다음과 같이 Confidential Data 가 배열에 담겨 넘겨지고 사용이 끝난후 폐기 되었
---

## Create Account
사용자 요청시 새로운 Account 를 생성한다.  
여기서 Account 생성은 Private/Public KeyPair 생성을 의미하는데,
MAuthWallet 은 ECDSA Secp256K1 커브를 사용하여  PrivateKey/PublicKey 를 생성하고 저장 한다.  
Account 저장은 [AWF](../data.md#arcanex-wallet-format--awf-) 형식으로 구성되어 저장되어야 하는데, 
자세한 사항은 [Save Account](#save-account) 를 참조한다.

---

## Import Account
외부에서 PrivateKey 를 입력 받아 MAuthWallet Account 를 생성하고 이를 저장([Save Account](#save-account) 참조) 한다.

---

## Export Account
사용자 요청시 Account 는 [AWF](../data.md#arcanex-wallet-format--awf-) 형식으로 내보내기 될 수 있다.
AWF 는 QR 코드 또는 텍스트 형식으로 노출 될 수 있으며,
텍스트 형식으로 노출될 경우, 복사 기능을 추가적으로 지원한다.

---

## Save Account
Account 는 [AWF](../data.md#arcanex-wallet-format--awf-) 형식으로 저장되어야 한다.  
AWF 는 PrivateKey를 암호화한 데이터와, 암호화에 사용된 암호화키(SecretKey) 유도에 필요한 파라메터를 담고 있다.
MAuthWallet 이 구동되는 디바이스 환경에 따라 다음과 같은 암호화 저장 방법이 구현 가능하다.  

- **보안영역(Secret Zone)이 지원 되는 경우**,  
PrivateKey 암복호화(+암복호화를 위한 SecretKey 관리) 를 Secret Zone 에 위임한다.  
이 경우, PrivateKey 암복호화를 위한 SecretKey 관리와 암복호화 수행 모두가 Secret Zone에 의해 이루어지며
MAuthWallet 은 그 결과(암복호화된 PrivateKey) 만을 다룬다.  
따라서, 암호화키(SecretKey) 유도 관련 파라메터 정보인 AWF 의 `dkp` 부분을 생략하고 그 외 부분만 저장하면 된다.  
이 경우 보안 영역에 대한 접근제어가 곧 사용자 인증에 해당된다.
즉 보안 영역에 접근할 권한을 획득 해야만 PrivateKey 복호화 및 사용이 가능 하게 된다.  
<br>
- **보안영역(Secret Zone)이 지원 되지 않는 경우**,  
PBKDF2 또는 Scrypt 알고리즘을 사용하여 사용자로 부터 입력된 기밀정보(e.g. 패스워드) 로 부터 SecretKey를 유도하고,
유도된 SecretKey로 암복호화를 MAuthWallet이 직접 수행해야 한다. 
따라서, AWF 의 `dkp` 부분이 포함되어 파일로 저장되어야 한다.

---

## Lock Account
모든 계정은 메모리상에 항상 '**잠금상태**' 로 존재하여야 한다.
'**잠금상태**' 란 Account 의 PrivateKey가 암호화된 상태여야 함을 의미한다.
즉, 의도된 시점을 제외한 어떤 때라도 복화화된 평문 PrivateKey가 메모리상에 존재해서는 안된다.

AWF 가 암호화된 형태이기 때문에 이를 메모리상에 로드한 Account 객체는 이미 잠금 상태이다.   
PrivateKey 사용이 필요할 때 마다 AWF 의 PrivateKey를 복호화 하여 사용해야 하는데,
결국 **잠금상태**란 복호화된 PrivateKey (평문 Privatekey) 를 메모리상에서 제거하는 것을 의미한다.

---

## Unlock Account
전자서명 생성을 위해 PrivateKey 사용이 필요할 경우,
사용자의 기밀정보(passphrase, fingerprint, face id 등)를 이용한 인증 절차를 통해 PrivateKey를 복호화 한다.  

앞 서 기술한 바와 같이 사용이 끝난 PrivateKey 및 기밀 데이터는 사용 즉시 폐기 되어야 한다.  
이는 한번 복호화된 PrivateKey 를 메모리상 어딘가에 저장해두고 이후 부터는 인증 절차 없이 사용하는 것이 아니라, 
필요할 때 마다 복호화 하고, 사용 즉시 폐기 하는 과정이 매번 반복되어야 함을 의미한다.

---

## MAuthDoc 자동 등록
신규 생성 및 가져오기([Import](#import-account)) 로 디바이스에 생성되는 모든 Account 의 PublicKey 는 'MAuthDoc' 으로 자동 등록되어야 한다.

---

## Remove Account
*Sprint2*

---

## Account Backup
*Sprint2*

---

## Account List
디바이스에 저장된 Account 는 목록으로 사용자에게 제공된다.
이 목록에서 사용자가 선택한 계정을 본 문서에서 **선택계정** 이라는 용어로 명시하기로 한다.

---

## Assets Balance
MAuthWallet 은 설정된 노드에 접속하여 해당 네트워크에서 선택계정의 잔액 정보를 보여준다.

---

## Transferring
선택계정의 자산을, 사용자가 지정한 주소의 계정으로, 사용자가 지정한 수량 만큼 전송 할 수 있는 기능을 제공한다.  

---

## Staking/Delegating
선택계정의 자산을사용자가 지정한 수량 만큼 지분으로 전환 할 수 있는 기능을 제공한다.
선택계정 자신의 지분으로 전환하는 것을 **지분전환 (Staking)** 이라 하고, 다른 계정의 지분으로 전환 하는 것을 **지분위임 (Delegating)** 이라 한다.
자신의 지분 또는 위임 지분 내역은 ArcaScan 을 통해 확인 할 수 있다.

---

## Unstaking/Undelegating
선택계정의 지분(Stake)을 다시 자산(Asset)으로 전환 할 수 있는 기능을 제공한다.
지분 --> 자산 전환은 트랜잭션이 처리 되더라도 바로 전환되지 않는다. 
거버넌스에서 정한 일정기간이 지난 후에 사용(전송) 가능한 자산으로 전환된다.
즉 일종의 '해동기간' 이 필요한데, 이 상태의 자산 정보를 확인 할 수 있는 별도의 UI/UX가 제공되어야 한다.

---

## Transaction History
선택계정이 발행자(sender) 또는 수신자(receiver) 로 지정된 트랜잭션 목록을 리스트 형태로 보여준다.  
이 목록은 트랜잭션 발생 역순으로 최근 X개로 구성되며 페이징 처리는 옵션이다.

## External Transaction Signing
외부에서 생성된 트랜잭션에 대한 전자서명이 요청될 수 있다.
외부에서 요청된 트랜잭션을 사용자가 확인하고 이에 대한 전자서명 후,
특정된 블록체인 네트워크로 전송하기 위한 사용 시나리오를 정의하고 이를 구현하여야 한다.

---

## Blockchain Network Monitoring
Sprint2

---

## Assets Swapping
Sprint2

---

## ARCANEX / MDL Node Setting
MAuthWallet 이 접속할 블록체인 네트워크의 노드 URL 을 추가 할 수 있어야 한다.
이미 추가된 노드 URL 은 목록 형태로 제공되어 선택 가능해야 한다.
[External Transaction Signing](#external-transaction-signing) 이 외의 모든 트랜잭션은 현재 선택된 Node 로 제출 되어야 한다.

---

## Authentication methods
MAuthWallet 은 다음과 같은 사용자 인증 수단을 제공해야 한다.

- 비밀번호  
사용자로 부터 보안 키보드를 통해 입력 받는 문자열.
- 지문  
디바이스 지원 여부를 확인하여 해당 기능 활성화 여부를 결정한다.
- 안면인식  
디바이스 지원 여부를 확인하여 해당 기능 활성화 여부를 결정한다.

디바이스가 지원한다면 가급적 생체 정보를 사용하도록 유도하는 사용 시나리오를 적용한다.