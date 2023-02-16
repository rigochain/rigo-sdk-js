# Overview


```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

Person(user, "User")

System_Boundary(verifier, "Service") {
    Container_Ext(service, "Service")
    Container(mauth_sdk, "MAUTH SDK")
}
System_Boundary(device, "User's device") {
    Container(mauth_app, "MAUTH APP", "And, iOS", "")
    Container(seczone, "Secret Zone")
}

System_Ext(expusher, "Push messaging service")

System(bc, "Trusted Storage", "Blockchain Network\nor\nAPI Server and DB")


Lay_D(user, verifier)
Lay_D(service, mauth_sdk)
Lay_D(user, device)
Lay_R(mauth_app, seczone)
Lay_D(verifier, bc)
Lay_D(device, expusher)

BiRel(user, service, "인증/서명 요청")
BiRel(service, mauth_sdk, "인증/서명 요청")
BiRel(mauth_sdk, bc, "MAuthDoc 조회")
BiRel(user, mauth_app, "MAuthDoc 생성/갱신, 인증요청 검토/확인")
BiRel_R(mauth_app, seczone, "Keypair 생성, 전자서명")
Rel(mauth_app, bc, "MAuthDoc 저장")
Rel(mauth_sdk, expusher, "Push message")
Rel_U(expusher, mauth_app, "Push message")

@enduml
```

## Create Account

ArcaWallet 은 사용자 요청시 새로운 Account 를 생성한다.
여기서 Account 생성은 ECDSA(secp256k1 curve) KeyPair 생성을 의미한다.  
ArcaWallet 은 Secp256K1 커브를 사용하여 ECDSA KeyPair 를 생성하고 저장([Save Account](#save-account) 참조) 한다.  
만일 파일 시스템에 저장할 경우, AES256 으로 암호화 하고 암호화 키는 반드시 보안영역에 의하여 관리되도록 해야 한다.

## Import Account

외부에서 Private Key 를 입력 받아 ArcaWallet Account 를 생성하고 이를 저장([Save Account](#save-account) 참조) 한다.

## Export Account

사용자 요청시 Account 는 [AWF](../data.md#arcanex-wallet-format--awf-) 형식으로 내보내기 될 수 있다.
AWF 는 QR 코드 또는 텍스트 형식으로 노출 될 수 있으며,
텍스트 형식으로 노출될 경우, 복사 기능을 추가적으로 지원한다.

## Save Account
Account 는 [AWF](../data.md#arcanex-wallet-format--awf-) 형식으로 저장되어야 한다.

## Account List
디바이스에 저장된 Account 는 목록으로 사용자에게 제공된다.
이 목록에서 사용자가 선택한 계정을 본 문서에서 **선택 계정** 이라는 용어로 명시하기로 한다.

## Lock Account
모든 계정은 메모리상에 항상 '**잠금상태**' 로 존재하여야 한다.
'**잠금상태**' 란 Account 의 Private Key가 암호화된 상태여야 함을 의미한다.
즉, 의도된 시점을 제외한 어떤 때라도 복화화된 평문 Private Key가 메모리상에 존재해서는 안된다.

AWF 가 암호화된 형태이기 때문에 이를 메모리상에 로드한 Account 객체는 이미 잠금 상태이다.  
필요시 AWF 의 Private Key를 복호화 하여 사용되는데, 결국 **잠금상태**란 복호화된 Private Key 를 메모리상에서 제거하는 것을 의미하며,
이는 곧 평문 형태의 Private Key 가 점유한 모든 메모리 영역을 zero값(또는 의미 없는 쓰레기 값) 으로 overwriting 함을 의미한다.

!!! note
    프로그래밍 언어에서 지원하는 가비지 컬랙션을 믿지 마라.

## Unlock Account
전자서명 생성을 위해 Private Key 가 복호화 되어야 할 경우,
사용자의 기밀정보(passphrase, fingerprint, face id 등)를 이용한 인증 절차를 통해 Private Key를 복호화 한다.  

!!! note
    사용이 완료된 평문 Private Key 는 메모리상에서 반드시 제거 되어야 한다. 즉 다시 **잠금상태** 되어야 한다.


## MAuthDoc 자동 등록
디바이스에 저장되는 모든 Account 의 Public Key 는 'MAuthDoc' 으로 자동 등록되어야 한다.

## Remove Account
*Sprint2*

## Account Backup
*Sprint2*


## Assets Balance
ArcaWallet 은 설정된 노드에 접속하여 해당 네트워크에서 현재 선택된 Account 의 잔액 정보를 보여준다.

## Transferring

현재 선택된 Account 의 자산을 사용자가 지정한 주소의 계정으로, 사용자가 지정한 수량 만큼 전송 할 수 있는 기능을 제공한다.  

## Staking/Delegating

현재 선택된 Account 의 자산을 중 사용자가 지정한 수량 만큼 지분으로 전환 할 수 있는 기능을 제공한다.
자신의 지분으로 전환하는 것을 **지분전환 (Staking)** 이라 하고, 다른 계정의 지분으로 전환 하는 것을 **지분위임 (Delegating)** 이라 한다.
자신의 지분 또는 위임 지분은 ArcaScan 을 통해 확인 할 수 있다.

## Unstaking/Undelegating

Staking/Delegating 한 지분을 다시 자산으로 전환 할 수 있는 기능을 제공한다.
지분을 자산으로 전환 하는 경우, 해당 트랜잭션이 처리 되더라도 바로 전환되지 않는다. 
거버넌스에서 정한 일정기간이 지난 후에 사용가능한 자산으로 전환된다.
즉 일종의 '해동기간' 이 필요한데, 이 상태에 있는 자산 정보를 사용자가 확인 할 수 있어야 한다.

## External Transaction Signing

외부에서 생성된 트랜잭션에 대한 전자서명이 요청될 수 있다.
외부에서 요청된 트랜잭션을 사용자가 확인하고 이에 대한 전자서명 후,
특정된 블록체인 네트워크로 제출할 수 있는 기능이 제공되어야 한다.

## Blockchain Network Monitoring 

Sprint2

## Assets Swapping

Sprint2

## ARCANEX / MDL Node Setting

ArcaWallet 이 접속할 블록체인 네트워크의 노드 URL 을 추가 할 수 있어야 한다.
이미 추가된 노드 URL 은 목록 형태로 제공되어 선택 가능해야 한다.

## Authentication methods

ArcaWallet 은 다음과 같은 사용자 인증 수단을 제공해야 한다.

- 비밀번호  
사용자로 부터 보안 키보드를 통해 입력 받는 문자열.
- 지문  
디바이스 지원 여부를 확인하여 해당 기능 활성화 여부를 결정한다.
- 안면인식  
디바이스 지원 여부를 확인하여 해당 기능 활성화 여부를 결정한다.

디바이스가 지원한다면 가급적 생체 정보를 사용하도록 유도하는 사용 시나리오를 적용한다.
