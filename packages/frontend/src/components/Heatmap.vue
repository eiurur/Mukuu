<template>
  <div class="heatmap">
    <div id="prev">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div id="cal-heatmap" :class="{ 'days-selected': isDaysSelected }"></div>
    <div id="next">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.heatmap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  background: white;
  border-radius: 0.25rem;
  border: 1px solid #dcdfe6;
  #cal-heatmap {
    margin-top: 0.5rem;
  }
  #next {
    display: flex;
    align-self: stretch;
    align-items: center;
    border-radius: 1rem;
    color: #c0c4cc;
    cursor: pointer;
    margin: 0.25rem 0;
    transition: all 0.25s ease;
    &:hover {
      background: #66b1ff;
      color: white;
    }
  }
  #prev {
    display: flex;
    align-self: stretch;
    align-items: center;
    color: #c0c4cc;
    border-radius: 1rem;
    cursor: pointer;
    margin: 0.25rem 0;
    transition: all 0.25s ease;
    &:hover {
      background: #66b1ff;
      color: white;
    }
  }
}
</style>

<script>
import post from "../api/post";

export default {
  name: "Heatmap",
  data() {
    return {
      isDaysSelected: false
    };
  },
  props: ["searchOption", "passSearchOption"],
  computed: {},
  watch: {},
  mounted() {
    this.setupCalHeatmap();
  },
  methods: {
    async setupCalHeatmap() {
      const { data } = await post.aggregate();
      const json = {};
      data.forEach(item => {
        const { year, month, day } = item.date;
        const key = new Date(year, month, day).valueOf() / 1000;
        json[key] = item.count;
      });
      console.log(json);
      const today = new Date();
      const cal = new CalHeatMap();
      cal.init({
        domain: "month",
        domainLabelFormat: "%Y-%m",
        data: json,
        start: new Date(today.getFullYear(), today.getMonth() - (3 - 1), today.getDate()),
        range: 3,
        tooltip: true,
        legendColors: {
          empty: "#ededed",
          min: "#b2f5fc",
          max: "#00b2c5"
        },
        displayLegend: false,
        verticalOrientation: false,
        nextSelector: "#next",
        previousSelector: "#prev",
        onClick: date => {
          const formatDate = this.$dayjs(date).format("YYYY-MM-DD");
          if (this.searchOption.to === formatDate) {
            this.isDaysSelected = false;
            cal.highlight();
          } else {
            this.isDaysSelected = true;
            cal.highlight(date);
          }
          this.searchOption.to = formatDate;
          this.passSearchOption(this.searchOption);
        }
      });
    }
  }
};
</script>
