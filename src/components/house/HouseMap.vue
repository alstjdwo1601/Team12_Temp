<template>
  <div>
    <h2>
      <img
        class="white--text align-end"
        height="35px"
        src="@/assets/placeholder.png"
      />&nbsp;&nbsp;&nbsp;<b>최단 동선 추천</b>
    </h2>
    <br />
    <div class="mb-5" id="map" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { eventBus } from "../../main.js";

const houseStore = "houseStore";

export default {
  data() {
    return {
      dataa: [],
      datab: [],
      markers: [],
      map: null,

      linemarker: [],
    };
  },

  computed: {
    ...mapState(houseStore, ["apts", "userhouse"]),
  },

  watch: {
    dataa() {
      this.displayMarkers(this.userhouse);
    },
    datab() {
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
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1f36115e847878579a1c20a59f5516e3&libraries=services";
      document.head.appendChild(script);
    }
    eventBus.$on("markerMapA", (data) => {
      this.removeMarker();
      this.removelineMarker();
      this.dataa = data;
    });
    eventBus.$on("markerMapB", (data) => {
      this.removeMarker();
      this.removelineMarker();
      this.datab = data;
    });

    eventBus.$on("mapReset", () => {
      this.initMap();
    });

    eventBus.$on("dijikstra", (result, start) => {
      this.gethousedistance(result, start);
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

    removelineMarker() {
      for (var i = 0; i < this.linemarker.length; i++) {
        this.linemarker[i].setMap(null);
      }
      this.linemarker = [];
    },

    gethousedistance(result, start) {
      console.log(result);
      this.removelineMarker();
      var length = result.length;
      var distance = new Array(length);

      for (let i = 0; i < length; i++) {
        distance[i] = new Array(length);
      }

      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
          if (i == j) distance[i][j] = 0;
          else
            distance[i][j] = this.getDistance(
              result[i].lat,
              result[i].lng,
              result[j].lat,
              result[j].lng
            );
        }
      }

      var d = new Array(length);
      var v = new Array(length);
      var ix = new Array(length);

      for (let i = 0; i < length; i++) {
        d[i] = distance[start][i];
      }
      v[start] = true;
      ix[0] = parseInt(start);

      for (let i = 1; i < length; i++) {
        var min = 10000000;
        var idx = 0;
        for (let k = 0; k < length; k++) {
          if (d[k] < min && v[k] != true) {
            min = d[k];
            idx = k;
          }
        }
        v[idx] = true;
        for (let j = 0; j < length; j++) {
          if (v[j] != true) {
            if (d[idx] + distance[idx][j] < d[j]) {
              d[j] = d[idx] + distance[idx][j];
            }
          }
        }
        ix[i] = idx;
      }

      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png", // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(50, 50), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        ),
        markerPosition = new kakao.maps.LatLng(
          result[ix[0]].lat,
          result[ix[0]].lng
        ); // 마커가 표시될 위치입니다

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커이미지 설정
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.map);
      this.linemarker.push(marker);
      var linePath = [];
      for (let i = 0; i < length; i++) {
        linePath.push(
          new kakao.maps.LatLng(result[ix[i]].lat, result[ix[i]].lng)
        );
      }

      // 지도에 표시할 선을 생성합니다
      var polyline = new kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: "#ff0000", // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });

      // 지도에 선을 표시합니다
      polyline.setMap(this.map);
      this.linemarker.push(polyline);

      var smageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png", // 마커이미지의 주소입니다
        smageSize = new kakao.maps.Size(50, 50), // 마커이미지의 크기입니다
        smageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var smarkerImage = new kakao.maps.MarkerImage(
          smageSrc,
          smageSize,
          smageOption
        ),
        smarkerPosition = new kakao.maps.LatLng(
          result[ix[length - 1]].lat,
          result[ix[length - 1]].lng
        ); // 마커가 표시될 위치입니다

      // 마커를 생성합니다
      marker = new kakao.maps.Marker({
        position: smarkerPosition,
        image: smarkerImage, // 마커이미지 설정
      });

      marker.setMap(this.map);
      this.linemarker.push(marker);
    },

    getDistance(x1, y1, x2, y2) {
      var lat1 = this.degreesToRadians(x1);
      var lng1 = this.degreesToRadians(y1);
      var lat2 = this.degreesToRadians(x2);
      var lng2 = this.degreesToRadians(y2);

      var Radius = 6371; //지구의 반경(km)
      var distance =
        Math.acos(
          Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng1 - lng2)
        ) * Radius;
      return distance;
    },

    degreesToRadians(degrees) {
      var radians = (degrees * Math.PI) / 180;
      return radians;
    },
  },
};
</script>

<style></style>
