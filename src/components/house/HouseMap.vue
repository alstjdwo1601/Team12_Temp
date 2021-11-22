<template>
  <div id="map" style="width: 100%; height: 500px"></div>
</template>

<script>
import { mapState } from "vuex";
import { eventBus } from "../../main.js";

const houseStore = "houseStore";

export default {
  data() {
    return {
      datas: [],
      markers: [],
      map: null,
    };
  },

  computed: {
    ...mapState(houseStore, ["apts"]),
  },

  watch: {
    datas() {
      this.displayMarkers(this.apts);
    },
  },

  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1f36115e847878579a1c20a59f5516e3&libraries";
      document.head.appendChild(script);
    }
    eventBus.$on("markerMap", (data) => {
      this.datas = data;
    });
  },
  methods: {
    initMap() {
      var mapContainer = document.getElementById("map"); // 지도를 표시할 div
      var mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      // 지도를 생성합니다
      this.map = new kakao.maps.Map(mapContainer, mapOption);
    },

    //검색 결과 목록과 마커를 표출하는 함수입니다
    displayMarkers(places) {
      var bounds = new kakao.maps.LatLngBounds();

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();
      for (var i = 0; i < places.length; i++) {
        var placePosition = new kakao.maps.LatLng(places[i].lat, places[i].lng);
        var marker = this.addMarker(placePosition, i);

        marker.setMap(this.map);
        bounds.extend(placePosition);
      }
      this.map.setBounds(bounds);
    },

    addMarker(position, idx) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
  },
};
</script>

<style></style>
