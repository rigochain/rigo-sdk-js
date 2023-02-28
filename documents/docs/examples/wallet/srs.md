## Overview
이 문서는 MAuthWallet 이 갖추어야 할 최소 요구사항을 One-page 형식으로 기술한다.

MAuthWallet 은 MDL, RIGO 상의 자산을 관리하기 위하여 개발되는 모바일 앱 형태의 월렛 이다.

일반적인 월렛 어플리케이션은,

1. 계정(지갑) 생성
2. 자산 확인
3. 자산 전송
4. 전송 내역 확인

을 기본 기능으로 제공한다.

MAuthWallet 역시 위 기본 기능을 제공함과 동시에, RIGO 의 합의 알고리즘인 DPoS 의 특성에 따른 추가 기능과, 
하이퍼렛지 기반의 MDL 상에서의 위 기본 기능을 함께 제공하도록 구현되어야 한다.

이러한 MAuthWallet 의 기능은 사용자 인증 용도로 개발된 MAuth App의 기능을 확장하는 형태로 개발 한다. 
즉 MAuth App 에 아래 기술되는 월렛 기능을 추가 하여 MAuthWallet 을 개발 한다.

---

## Requirements

### Add and select Node URL
MAuthWallet 이 접속할 블록체인 네트워크의 노드 URL 을 추가 할 수 있어야 한다.
이미 추가된 노드 URL 은 목록 형태로 제공되어 선택 가능해야 한다.

노드를 설정 또는 선택하는 것은, 특정 블록체인 네트워크를 선택하는 것과 동일한 의미를 지닌다.
특정 블록체인 네트워크 선택후 노출되는 모든 정보는(Assets, Tokens, Tx history 등) 해당 네트워크 상에서의 정보이어야 한다.  

!!! note 
    [External Transaction Signing](#external-transaction-signing) 이 외의 모든 트랜잭션은 현재 선택된 노드로 제출 되어야 한다.  
    즉 현재 선택된 노드가 어떤 블록체인 네트워크의 노드인가에 따라서 생성해야 하는 트랜잭션이 달라 지게 된다.  

---


### Create Account
사용자 요청시 새로운 Account 를 생성한다.  
여기서 Account 생성은 Private/Public KeyPair 생성을 의미하는데,
MAuthWallet 은 ECDSA Secp256K1 커브를 사용하여  PrivateKey/PublicKey 를 생성하고 저장 한다.  
Account 저장은 [RIGO Wallet Format (RWF)](../../internals/data.md#rigo-wallet-format--rwf-) 형식으로 구성되어 저장되어야 하는데, 
자세한 사항은 [Save Account](#save-account) 를 참조한다.

---

### Import Account
외부에서 PrivateKey 를 입력 받아 MAuthWallet Account 를 생성하고 이를 저장([Save Account](#save-account) 참조) 한다.

---

### Export Account
사용자 요청시 Account 는 [RWF](../../internals/data.md#rigo-wallet-format--rwf-) 형식으로 내보내기 될 수 있다.
RWF 는 QR 코드 또는 텍스트 형식으로 노출 될 수 있으며,
텍스트 형식으로 노출될 경우, 복사 기능을 추가적으로 지원한다.

---

### Save Account
Account 는 [RWF](../../internals/data.md#rigo-wallet-format--rwf-) 형식으로 저장되어야 한다.  
RWF 는 PrivateKey를 암호화한 데이터와, 암호화에 사용된 암호화키(SecretKey) 유도에 필요한 파라메터를 담고 있다.
MAuthWallet 이 구동되는 디바이스 환경에 따라 다음과 같은 암호화 저장 방법이 구현 가능하다.  

- **보안영역(Secret Zone)이 지원 되는 경우**,  
PrivateKey 암복호화(+암복호화를 위한 SecretKey 관리) 를 Secret Zone 에 위임한다.  
이 경우, PrivateKey 암복호화를 위한 SecretKey 관리와 암복호화 수행 모두가 Secret Zone에 의해 이루어지며
MAuthWallet 은 그 결과(암복호화된 PrivateKey) 만을 다룬다.  
따라서, 암호화키(SecretKey) 유도 관련 파라메터 정보인 RWF 의 `dkp` 부분을 생략하고 그 외 부분만 저장하면 된다.  
이 경우 보안 영역에 대한 접근제어가 곧 사용자 인증에 해당된다.
즉 보안 영역에 접근할 권한을 획득 해야만 PrivateKey 복호화 및 사용이 가능 하게 된다.  
<br>
- **보안영역(Secret Zone)이 지원 되지 않는 경우**,  
PBKDF2 또는 Scrypt 알고리즘을 사용하여 사용자로 부터 입력된 기밀정보(e.g. 패스워드) 로 부터 SecretKey를 유도하고,
유도된 SecretKey로 암복호화를 MAuthWallet이 직접 수행해야 한다. 
따라서, RWF 의 `dkp` 부분이 포함되어 파일로 저장되어야 한다.

---

### Lock Account
모든 계정은 메모리상에 항상 '**잠금상태**' 로 존재하여야 한다.
'**잠금상태**' 란 Account 의 PrivateKey가 암호화된 상태여야 함을 의미한다.
즉, 의도된 시점을 제외한 어떤 때라도 복화화된 평문 PrivateKey가 메모리상에 존재해서는 안된다.

RWF 가 암호화된 형태이기 때문에 이를 메모리상에 로드한 Account 객체는 이미 잠금 상태이다.   
PrivateKey 사용이 필요할 때 마다 RWF 의 PrivateKey를 복호화 하여 사용해야 하는데,
결국 **잠금상태**란 복호화된 PrivateKey (평문 Privatekey) 를 메모리상에서 제거하는 것을 의미한다.

---

### Unlock Account
전자서명 생성을 위해 PrivateKey 사용이 필요할 경우,
사용자의 기밀정보(passphrase, fingerprint, face id 등)를 이용한 인증 절차를 통해 PrivateKey를 복호화 한다.  

앞 서 기술한 바와 같이 사용이 끝난 PrivateKey 및 기밀 데이터는 사용 즉시 폐기 되어야 한다.  
이는 한번 복호화된 PrivateKey 를 메모리상 어딘가에 저장해두고 이후 부터는 인증 절차 없이 사용하는 것이 아니라, 
필요할 때 마다 복호화 하고, 사용 즉시 폐기 하는 과정이 매번 반복되어야 함을 의미한다.

---

### Clear Confidential Data
MAuthWallet 은 암호화 기능을 구현하면서, 다양한 기밀 데이터(Confidential Data)를 처리하게 되는데,
이러한 Confidential Data 들은 사용 직후 메모리상에서 바로 폐기되어야 한다.  
즉, Confidential Data 가 메모리상에 존재하는 시간은 최소화 되어야 하며, 사용 완료 즉시 메모리상에서 복구 불가능한 형태로 폐기 되도록 구현하여야 한다.  
MAuthWallet 에서 다루는 Confidential Data 는 다음과 같다.

- **PrivateKey** : PublicKey에 대응되는 PrivateKey.
- **SecretKey** : 대칭키 암호화 알고리즘에서 사용되는 암복호화 키.  
  디바이스의 보안영역을 사용하면 MAuthWallet 에서 직접 다루지 않을 수도 있다.
- **Passphrase** : SecretKey 를 유도하기 위하여 사용자가 입력하는 데이터. (e.g. 사용자 비밀번호)

**메모리상에서 폐기**란 해당 데이터가 점유했던 모든 메모리 영역을 `0x00`로 초기화 함을 의미한다.

!!! note
Programming Language, VM 등 에서 제공하는 Garbage Collector 에 의존하지 마라.

!!! warning
    Confidential Data 가 Call-By-Value 방식의 함수 파라메터로 전달 될 때, 특별한 주의가 필요하다.  
    예를 들어 아래와 같은 코드에서,  
    slice 가 아닌 array 를 요구하는 함수 `B`에 전달할 인자 `arrPass` 를 구성하고,
    함수 `B` 호출후 사용 완료 시점에서 `arrPass`와 `arrSlice` 를 폐기(`clearBytes`호출) 하였다.  
    그러나 golang 의 array 는 Call-By-Value 방식으로 전달 되기 때문에,
    `arrPass`와 `arrPassArg`는 각자 서로 다른 메모리 영역을 갖고 있다.
    때문에 `arrPassArg`의 메모리 영역에는 여전히 Confidential Data 가 남아 있게 된다.
    <br><br>
    또한 함수 `A`로 전달 받은 `pass` 역시 초기화 대상이다. 이를 초기화 하기 위하여 `clearString` 을 호출하였다. 어떻게 될까?
    (hint: Golang 에서 `string`은 value 이다.)

```
    func A(pass string) {
        arrSlice := []byte(pass)
        
        var arrPass [32]byte
        copy(arrPass[:], arrSlice)
        
        B(arrPass)
        
        clearBytes(arrSlice)
        clearBytes(arrPass[:])
        clearString(pass)
    }
    
    func B(arrPassArg [32]byte) {
        ...
    }

    func clearBytes(d []byte) {
        for i, _ := range d {
            d[i] = byte(0x00)
        }
    }
    func clearString(s string) {
        s = ""
    }
```

---

### MAuthDoc 자동 등록
신규 생성 및 가져오기([Import](#import-account)) 로 디바이스에 생성되는 모든 Account 의 PublicKey 는 'MAuthDoc' 으로 자동 등록되어야 한다.

---

### Account List
디바이스에 저장된 Accounts 는 목록으로 사용자에게 제공된다.
이 목록에서 사용자가 선택한 계정을 가리키기 위하여 본 문서에서 **선택계정** 이라는 용어를 사용한다.

---

### Assets Balance

MAuthWallet 은 설정된 노드에 접속하여 해당 네트워크에서 선택계정의 자산의 잔액 정보를 보여준다.  
선택계정 조회는 [queryAccount](../../api/rweb3.md#queryaccount),
동기화는 [syncAccount](../../api/rweb3.md#syncaccount) 를 참조한다.

!!! note
    본 문서에서 **Asset** 이라는 용어는 블록체인 네트워크의 Native Coin 과 해당 네트워크 상에서 발행된 Token (e.g. ERC20) 을 통칭하는 용어로 사용된다.
    선택계정의 자산 정보라 함은 특정 블록체인 네트워크 상의 Native Coin 과 Token 모두에 대한 정보를 의미한다.  
    이중 Token 에대해서는 사용자가 직접 추가한 Token 에 대한 정보로 제한한다.

---

### Transferring
선택계정의 자산을, 사용자가 지정한 주소의 계정으로, 사용자가 지정한 수량 만큼 전송 할 수 있는 기능을 제공한다.  

이 기능은 블록체인 원장의 기록을 변경하는 것으로서, 트랜잭션 발생이 필요하다. 

!!! TIP "MDL"
    MDL에 대하여 동일한 기능을 구현 해야 하며, 구현 방법은 MDL 명세를 따른다.

---

### Staking/Delegating
선택계정의 자산(Coin)을 사용자가 지정한 수량 만큼 지분으로 전환 할 수 있는 기능을 제공한다.
선택계정 자신의 지분으로 전환하는 것을 **지분전환 (Staking)** 이라 하고, 다른 계정의 지분으로 전환 하는 것을 **지분위임 (Delegating)** 이라 한다.
자신의 지분 또는 위임 지분 내역은 ArcaScan 을 통해 확인 할 수 있다.

이 기능은 블록체인 원장의 기록을 변경하는 것으로서, 트랜잭션 발생이 필요하다.

---

### Unstaking/Undelegating
선택계정의 지분(Stake)을 다시 자산(Coin)으로 전환 할 수 있는 기능을 제공한다.
지분 --> 자산 전환은 트랜잭션이 처리 되더라도 바로 전환되지 않는다. 
거버넌스에서 정한 일정기간이 지난 후에 사용(전송) 가능한 자산으로 전환된다.
즉 일종의 '해동기간' 이 필요한데, 이 상태의 자산 정보를 확인 할 수 있는 별도의 UI/UX가 제공되어야 한다.

이 기능은 블록체인 원장의 기록을 변경하는 것으로서, 트랜잭션 발생이 필요하다.

---

### Build and submit Transactions

트랜잭션을 생성하고 제출하기 위해서는 다음과 같은 단계를 수행해야 한다.

1. 트랜잭션 생성 계정 동기화 : `RWeb3`의 `syncAccount` API 사용
2. 트랜잭션 생성: `TrxBuilder.BuildXXX` API 사용
3. 트랜잭션 전자서명: `TrxBuilder.SignTrx` API 사용
4. 트랜잭션 제출 : `RWeb3`의 `broadcastTrxSync` API 사용
5. 트랜잭션 커밋(Commit) 확인 : `RWeb3`의 `queryTrx` API 사용

트랜잭션 제출이 성공하였음이 **블록체인에 기록(Commit) 되었음을 의미하지는 않는다**. 
때문에 트랜잭션 제출 이후 해당 트랜잭션이 블록체인 원장에 기록되었음을 확인하는 절차가 필요하다.

```ts
const rweb3 = new RWeb3(...)

// sync. account
rweb3.syncAccount(acct).then( () => {
  // build a tx.
    const tx = TrxBuilder.BuildTransferTrx({
      from: acct.address,
      to: acct.address,
      nonce: acct.nonce + 1,
      gas: "10",
      amount: "1000000"}
  })
  
  // sign the tx.
  TrxBuilder.SignTrx(tx, acct);
  rweb3.broadcastTrxSync(tx).then (resp => {
    if(resp.code != 0) {
      console.error(resp.log)
    }
    console.log(resp)
  })
})
.catch( err => {
  console.error(err);
});
```

위와 같은 코드를 실행하면, 성공시 다음과 같은 응답값이 출력된다.

```json
{
  "code": 0,
  "data": "",
  "log": "",
  "codespace": "",
  "hash": "C24E840F65CBD187B6757F57F014A620588C85F99C3E613E1E696FE7870956A6"
}
```

!!! TIP "MDL"
    MDL에 대하여 동일한 기능을 구현 해야 하며, 구현 방법은 MDL 명세를 따른다.

### Check Transaction's Commit

트랜잭션이 블록체인에 기록(커밋)되었음을 확인하기 위해 `RWeb3`객체의 `queryTrx` API 를 사용한다.  
앞서 [Build and submit Transactions](#build-and-submit-transactions) 에서 
응답으로 수신한 데이터중 `resp.hash` 를 인자로 하여 `RWeb3`객체의 `queryTrx`를 호출한다.  

```ts
const rweb3 = new RWeb3(...)

try {
    setTimeout( () => {
        rweb3.queryTrx(resp.hash).then( retTx => {
            ...
        });
    }, 1500)

} catch(e) {
    console.error('this is catched at html', e)
}
```

트랜잭션이 아직 커밋 전이면, 위 예제에서 `catch` 블록으로 떨어지게 될 것이다.
이는 트랜잭션이 블록체인 네트워크에서 처리 중에 발생할 수 있는 에러이기 때문에, 일정 시간(e.g. 1500ms) 후에 다시 시도한다.
앞서 트랜잭셩 생성 및 제출이 성공하였다면, 언젠가는 아래와 같은 응답을 수신하게 될 것이다.

```json
{
    "hash": "C24E840F65CBD187B6757F57F014A620588C85F99C3E613E1E696FE7870956A6",
    "height": "111022",
    "index": 0,
    "tx_result": {
        "code": 0,
        "data": null,
        "log": "",
        "info": "",
        "gas_wanted": "10",
        "gas_used": "10",
        "events": [
            {
                "type": "tx",
                "attributes": [
                    {
                        "key": "dHgudHlwZQ==",
                        "value": "dHJhbnNmZXI=",
                        "index": true
                    },
                    {
                        "key": "dHguc2VuZGVy",
                        "value": "OERDNDFBODZCOTFFQjg4RDgyNDg5QzREMDM3QUU5RkZDQTY1Q0ZCRg==",
                        "index": true
                    },
                    {
                        "key": "dHgucmVjZWl2ZXI=",
                        "value": "MUM2QzcxRDNCMERCMEM0NTM3RjdFQ0REMkM5RkU2Rjg2QkI5QzE1RQ==",
                        "index": true
                    },
                    {
                        "key": "dHguYWRkcnBhaXI=",
                        "value": "OERDNDFBODZCOTFFQjg4RDgyNDg5QzREMDM3QUU5RkZDQTY1Q0ZCRjFDNkM3MUQzQjBEQjBDNDUzN0Y3RUNERDJDOUZFNkY4NkJCOUMxNUU=",
                        "index": true
                    }
                ]
            }
        ],
        "codespace": ""
    },
    "tx": {
        "hash": "c24e840f65cbd187b6757f57f014a620588c85f99c3e613e1e696fe7870956a6",
        "version": 1,
        "time": "2023-02-20T02:43:30.452Z",
        "nonce": 14,
        "from": "8dc41a86b91eb88d82489c4d037ae9ffca65cfbf",
        "to": "1c6c71d3b0db0c4537f7ecdd2c9fe6f86bb9c15e",
        "amount": "1000000",
        "gas": "10",
        "type": 1,
        "sig": "cf8529647120464811e6d63e98b2697a5b78ffac7e6e95e4f97fe30420e9cc50725c009aa64fd3b1b232031b55516d89a0d28f7f4202c6698213054a4d00771b01"
    },
    "proof": {
        "root_hash": "DDC2FF8F8662EC2FED57C62F3262A95B90C3C7869D5A4E5D788B86A8116E269B",
        "data": "CAEQgNrGjcaG2qIXGA4iFI3EGoa5HriNgkicTQN66f/KZc+/KhQcbHHTsNsMRTf37N0sn+b4a7nBXjIDD0JAOgEKQAFSQc+FKWRxIEZIEebWPpiyaXpbeP+sfm6V5Pl/4wQg6cxQclwAmqZP07GyMgMbVVFtiaDSj39CAsZpghMFSk0AdxsB",
        "proof": {
            "total": "1",
            "index": "0",
            "leaf_hash": "3cL/j4Zi7C/tV8YvMmKpW5DDx4adWk5deIuGqBFuJps=",
            "aunts": []
        }
    },
    "encoded": "CAEQgNrGjcaG2qIXGA4iFI3EGoa5HriNgkicTQN66f/KZc+/KhQcbHHTsNsMRTf37N0sn+b4a7nBXjIDD0JAOgEKQAFSQc+FKWRxIEZIEebWPpiyaXpbeP+sfm6V5Pl/4wQg6cxQclwAmqZP07GyMgMbVVFtiaDSj39CAsZpghMFSk0AdxsB"
}
```

!!! note
    **트랜잭션이 커밋에 성공한 것과, 트랜잭션 실행이 성공한 것과는 다르다.**  
    즉 트랜잭션이 블록체인에 기록되었지만, 실패 상태로 기록되는 상황이 얼마든지 가능하다.  
    트랜잭션 실행 성공 여부는 위 응답값의 `tx_result.code` 가 `0` 임을 확인한다.
    그 외의 값은 실행 실패를 의미하며 이 때 `tx_result.log`는 발생한 에러에 대한 메시지를 담고 있다.

---

!!! TIP "MDL"
    MDL에 대하여 동일한 기능을 구현 해야 하며, 구현 방법은 MDL 명세를 따른다.

### Transaction History
선택계정이 발행자(sender) 또는 수신자(receiver) 로 지정된 트랜잭션 목록을 리스트 형태로 보여준다.  
이 목록은 트랜잭션 발생 역순으로 최근 X개로 구성되며 페이징 처리는 옵션이다.

!!! TIP "MDL"
    MDL에 대하여 동일한 기능을 구현 해야 하며, 구현 방법은 MDL 명세를 따른다.
---

### Authentication methods
MAuthWallet 은 다음과 같은 사용자 인증 수단을 제공해야 한다.

- 비밀 번호  
  사용자로 부터 보안 키보드를 통해 입력 받는 문자열.
- 생체 정보  
  지문, 안면인식 등 디바이스에서 지원하는 생체 인식 메커니즘.

디바이스가 지원한다면 가급적 생체 정보를 사용하도록 유도하는 사용 시나리오를 적용, 구현한다.

---

### SDK

*RIGO 노드와 통신하는 부분을 모듈화 -> 별도의 프로젝트로 -> SDK 확보 ?*


## ETC.

Sprint_N

---

### Remove Account

---

### Account Backup

---

### Assets Swapping

---

### Add Tokens

현재 선택된 네트워크상에 발행된 토큰을 추가 할 수 있다.
토큰 추가는 해당 토큰에 대한 식별자(e.g. 토큰 컨트랙트 주소) 를 입력함으로서 이루어진다.
토큰이 추가되면 해당 토큰의 잔액 정보 및 전송이 가능해야 한다.

---

### Blockchain Network Monitoring

---

### External Transaction Signing
외부에서 생성된 트랜잭션에 대한 전자서명이 요청될 수 있다.
외부에서 요청된 트랜잭션을 사용자가 확인하고 이에 대한 전자서명 후,
특정된 블록체인 네트워크로 전송하기 위한 사용 시나리오를 정의하고 이를 구현하여야 한다.

---
