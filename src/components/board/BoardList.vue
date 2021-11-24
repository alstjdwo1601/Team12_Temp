<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col v-if="articles.length">
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>글번호</b-th>
              <b-th>제목</b-th>
              <b-th>조회수</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <!-- 하위 component인 ListRow에 데이터 전달(props) -->
            <board-list-row
              v-for="(article, index) in articles"
              :key="index"
              v-bind="article"
            />
          </tbody>
        </b-table-simple>
      </b-col>
      <!-- <b-col v-else class="text-center">도서 목록이 없습니다.</b-col> -->
    </b-row>
    <b-row class="mb-3">
      <b-col class="text-right">
        &nbsp;&nbsp;&nbsp;
        <b-button
          variant="outline-primary"
          style="float: right"
          @click="searchPg"
          >검색</b-button
        >
        <b-form-input
          v-model="word"
          style="width: 250px; float: right"
        ></b-form-input>
        &nbsp;&nbsp;&nbsp;
        <b-form-select
          v-model="key"
          :options="options"
          style="width: 100px"
        ></b-form-select>
      </b-col>
    </b-row>
    <b-button-toolbar
      class="mb-5"
      key-nav
      aria-label="Toolbar with button groups"
      style="justify-content: center"
    >
      <b-button-group class="mx-1">
        <b-button
          size="sm"
          variant="primary"
          :disabled="pg == 1"
          @click="firstPg"
          >&laquo;</b-button
        >
        <b-button size="sm" variant="primary" :disabled="pg == 1" @click="prePg"
          >&lsaquo;</b-button
        >
      </b-button-group>
      <span class="mt-1">&nbsp; {{ pg }} / {{ totalCnt }} page&nbsp;</span>
      <b-button-group class="mx-1">
        <b-button
          size="sm"
          variant="primary"
          :disabled="pg == totalCnt"
          @click="nextPg"
          >&rsaquo;</b-button
        >
        <b-button
          size="sm"
          variant="primary"
          :disabled="pg == totalCnt"
          @click="endPg"
          >&raquo;</b-button
        >
      </b-button-group>
    </b-button-toolbar>
  </b-container>
</template>

<script>
import BoardListRow from "@/components/board/child/BoardListRow";
import { listArticle, getTotal } from "@/api/board.js";

export default {
  name: "BoardList",
  components: {
    BoardListRow,
  },
  data() {
    return {
      articles: [],
      total: 0,
      pg: 1,

      word: null,
      key: null,
      options: [
        { value: "subject", text: "제  목" },
        { value: "userid", text: "아이디" },
      ],
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 15,
      key: null,
      word: null,
    };
    listArticle(
      param,
      (response) => {
        this.articles = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
    getTotal(
      ({ data }) => {
        console.log(data);
        this.total = data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  computed: {
    totalCnt() {
      let listLeng = this.total,
        listSize = 15,
        page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      return page;
    },
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "BoardWrite" });
    },
    firstPg() {
      this.pg = 1;
      this.chagePg(this.pg);
    },
    prePg() {
      this.pg--;
      this.chagePg(this.pg);
    },
    nextPg() {
      this.pg++;
      this.chagePg(this.pg);
    },
    endPg() {
      this.pg = this.totalCnt;
      this.chagePg(this.pg);
    },
    chagePg(pgNum) {
      let param = {
        pg: pgNum,
        spp: 15,
        key: null,
        word: null,
      };
      listArticle(
        param,
        (response) => {
          this.articles = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    searchPg() {
      let param = {
        pg: this.pg,
        spp: 15,
        key: this.key,
        word: this.word,
      };
      listArticle(
        param,
        (response) => {
          this.articles = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
.inner {
  display: inline-block;
}
</style>
