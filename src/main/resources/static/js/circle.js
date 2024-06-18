// 원 객체를 생성합니다
var circle = new kakao.maps.Circle({
    center : centerPosition, // 원의 중심좌표입니다
    radius: polyline.getLength(), // 원의 반지름입니다 m 단위 이며 선 객체를 이용해서 얻어옵니다
    strokeWeight: 1, // 선의 두께입니다
    strokeColor: '#00a0e9', // 선의 색깔입니다
    strokeOpacity: 0.1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid', // 선의 스타일입니다
    fillColor: '#00a0e9', // 채우기 색깔입니다
    fillOpacity: 0.2  // 채우기 불투명도입니다
});