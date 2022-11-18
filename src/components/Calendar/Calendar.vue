<template>
  <div id="app" class="text" v-cloak @click="closewindow()">
    <!-- start, center, end, space-between, space- -->
    <div>
      <el-button type="primary" icon="el-icon-plus" circle @click.stop="creat_task()"></el-button>
      <!-- .stop: can prevent the click event from propagating to the parent layer -->
      <transition name="el-fade-in-linear">
        <div ref="popover" v-show="showpopover" @click.stop>
          <popover :inputleft="popover_left" :inputtop="popover_top" :inputtask="popover_task"
            @task_edit="task_edit_tasklist" @close="closepopover" @task_delete="task_delete_popover"></popover>
        </div>
      </transition>

      <transition name="el-fade-in-linear">
        <div v-show="showlist" @click.stop>
          <dialog-bar @close="close_tasklistvue" @set_task="set_task" 
          :isEdit="tasklst_is_edit" :key="list_index" :inputtask="popover_task">
          </dialog-bar>
        </div>
      </transition>

      <h1>{{ today.year }} 年 {{ today.month }} 月</h1>

      <div class="div_date_picker">
        <el-date-picker v-model="value2" type="month" placeholder="选择月" size="large" format="yyyy 年 MM 月"
          value-format="yyyy-MM">
        </el-date-picker>
      </div>
    </div>

    <div class="calendar">
      <div class="weekDay">
        <div style="background: rgb(103, 194, 58)">日</div>
        <div style="background: rgb(64, 158, 255)">一</div>
        <div style="background: rgb(64, 158, 255)">二</div>
        <div style="background: rgb(64, 158, 255)">三</div>
        <div style="background: rgb(64, 158, 255)">四</div>
        <div style="background: rgb(64, 158, 255)">五</div>
        <div style="background: rgb(103, 194, 58)">六</div>
      </div>

      <div class="week" v-bind:key="i" v-for="i in 5">
        <div v-bind:key="j" class="day" v-for="j in 7">
          {{ calendar_data[(i - 1) * 7 + j - 1].date }}

          <div v-if="
            checkdaytask(calendarformat(calendar_data[(i - 1) * 7 + j - 1]))
          " class="taskbar" v-bind:key="title" v-for="title in task_datavalue[
  calendarformat(calendar_data[(i - 1) * 7 + j - 1])
]" :ref="`task${(i - 1) * 7 + j - 1}`" @click.stop="
  openpopover(
    `task${(i - 1) * 7 + j - 1}`,
    task_datavalue[
    calendarformat(calendar_data[(i - 1) * 7 + j - 1])
    ],
    title.Title,
    calendarformat(calendar_data[(i - 1) * 7 + j - 1])
  )
">
            <div>{{ title.Title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../network/request.js";
import popover from "./popover";
import dialogBar from "./tasklist";

export default {
  components: {
    "dialog-bar": dialogBar,
    popover: popover,
  },
  data() {
    return {
      today: {
        year: 0,
        month: 0,
        date: 0,
        day: 0,
      },
      form: {
        title: "",
        desc: "",
      },
      showlist: false,
      showpopover: false,
      datavalue: "",
      id: 0,
      list_index: 0,
      task_datavalue: {},
      popover_left: 0,
      popover_top: 0,
      popover_task: {}, //The111 value passed into the popover
      tasklist: {},
      value2: "",
      current_click_task: {}, // 紀錄當前點及任務資訊
      tasklst_is_edit: false, // 紀錄是否為編輯
    };
  },
  mounted() {
    this.setToday();
    this.getTask_list();
  },
  methods: {
    getTask_list() {
      request({
        url: "/api/calendar",
        method: "get",
        headers: {
          Authorization: this.$cookies.get("Authorization"),
          UserID: this.$cookies.get("UserID"),
        }
      })
        .then((res) => {
          // console.log(res.data[0]);
          console.log("res.date", res.data[0]["date"])
          for (var i in res.data) {
            if (
              // 判斷task_datavalue 是否已建立該 日期的成員
              !Object.prototype.hasOwnProperty.call(
                this.task_datavalue,
                res.data[i]["date"]
              )
            ) {
              this.$set(this.task_datavalue, [res.data[i]["date"]], {});
              // this.task_datavalue[res.data[i]['Date']] = {};
              this.task_datavalue[res.data[i]["date"]][res.data[i]["id"]] = {
                Title: res.data[i]["title"],
                Content: res.data[i]["content"],
                Id: res.data[i]["id"],
              };
            } else {
              this.task_datavalue[res.data[i]["date"]][res.data[i]["id"]] = {
                Title: res.data[i]["title"],
                Content: res.data[i]["content"],
                Id: res.data[i]["id"],
              };
            }
          }
          console.log("created", this.task_datavalue);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setToday() {
      var time = new Date();
      this.today.year = time.getFullYear();
      this.today.month = time.getMonth() + 1;
      this.today.date = time.getDate(); //獲取 日期
      this.today.day = time.getDay(); //獲取 星期幾 0~6 星期天~星期六
    },
    openpopover(refId, task, title, data) {
      this.current_click_task = task;
      this.showpopover = true;
      let [div] = this.$refs[refId];

      let top = div.getBoundingClientRect().top;
      let left = div.getBoundingClientRect().left;
      this.popover_left = left;
      this.popover_top = top;

      //The value passed into the popover
      console.log("asda", task)
      for (var i in task) {
        if (task[i]["Title"] == title) {
          this.popover_task = {
            date: data,
            title: title,
            content: task[i]["Content"],
            id: i,
          };
          break;
        }
      }
    },
    closepopover() {
      this.showpopover = false;
    },
    creat_task() {
      this.tasklst_is_edit = false;
      this.showlist = true;

    },
    task_edit_tasklist() {
      this.showlist = true;
      this.tasklst_is_edit = true
      console.log(this.popover_task)
      console.log("asdkalsdka")



      // this.showpopover = false;
    },
    task_delete_popover(id, date) {
      console.log("task_delete_popover", this.task_datavalue, date, id)
      this.$delete(this.task_datavalue[date], id);   //Use this.$delete(array, index, value) to delete data responsively
      this.showpopover = false;
    },
    closelist() {
      this.showlist = false;
    },
    close_tasklistvue() {
      console.log("asdasd")
      this.showlist = false;

    },
    closewindow() {
      if (this.showlist) this.showlist = false;
      if (this.showpopover) this.showpopover = false;
    },
    calendarformat(data) {
      var month, date;

      month = String(data.month + 1);
      date = String(data.date);
      if (month.length < 2) {
        month = "0" + month;
      }
      if (date.length < 2) {
        date = "0" + date;
      }
      data = String(data.year) + "-" + month + "-" + date;

      return data;
    },

    set_task(form, datavalue, isEdit, inputtask) {
      console.log("set_task", form, datavalue, isEdit, inputtask)
      if (isEdit == true) {
        console.log("isedit", inputtask);
        this.task_delete_popover(inputtask["id"], inputtask["date"])
      }
      // 關閉 tasklist
      this.$emit("close");
      console.log("set_task")
      datavalue = String(datavalue);

      var id;
      request({
        url: "/api/calendar",
        method: "post",
        headers: {
          Authorization: this.$cookies.get("Authorization"),
          UserID: this.$cookies.get("UserID"),
        },
        data: form,

      })
        .then((res) => {
          if (res == "fail") {
            console.log("fail");
          }

          id = res["data"];
          if (
            !Object.prototype.hasOwnProperty.call(
              this.task_datavalue,
              datavalue
            )
          ) {

            //Use vm.$set(array, index, value) to modify data content responsively
            this.$set(this.task_datavalue, [datavalue], {});
            this.task_datavalue[datavalue][id] = {
              Title: form.Title,
              Content: form.Content,
            };

          } else {
            this.$set(this.task_datavalue[datavalue], [id], {});
            this.task_datavalue[datavalue][id] = {
              Title: form.Title,
              Content: form.Content,
            };

          }
        })
        .catch((err) => {
          console.log(err);
        });

      this.list_index += 1;
      // methods互相調用方法
    },
    setTask_toSQL(datavalue, form) {
      form = { Date: datavalue, Title: form.title, Content: form.desc };
    },
    checkdaytask(datavalue) {

      if (
        Object.prototype.hasOwnProperty.call(this.task_datavalue, datavalue)
      ) {

        return true;
      }

      return false;
    },
    edit_task() { },
  },
  computed: {
    calendar_data() {
      var calendar = [];
      var date, data;
      var firstday = new Date(this.today.year, this.today.month - 1, 1);
      for (var i = 0; i < 35; i++) {
        if (i < firstday.getDay()) {
          date = new Date(
            firstday.getFullYear(),
            firstday.getMonth(),
            firstday.getDate() - (firstday.getDay() - i)
          );
          data = {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
          };
          calendar[i] = data;
        } else {
          date = new Date(
            firstday.getFullYear(),
            firstday.getMonth(),
            firstday.getDate() + (i - firstday.getDay())
          );
          data = {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
          };
          calendar[i] = data;
        }
      }
      return calendar;
    },
  },
  watch: {
    value2: function () {
      var time = this.value2.split("-");
      this.today.year = time[0];
      this.today.month = time[1];
    },
  },
};
</script>

<style lang="less" scoped>
[v-cloak] {
  display: none;
}

.text {
  text-align: center;
  display: flex;
}

.calendar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.weekDay {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
}

.weekDay>div {
  flex: 1 1 0%;
  height: 40px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  font-size: 25px;
}

.week {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
}

.week>div {
  flex: 1 1 0%;
  height: 162px;
  line-height: 30px;
  border-left: 1px solid #dadce0;
  border-bottom: 1px solid #dadce0;
}

.week>div:before {
  position: relative;
  display: block;
  text-align: center;
}

.today:before {
  color: rgb(255, 0, 0);
  text-shadow: 6px 2px 2px rgba(0, 0, 0, 0.3);
  font-weight: bold;
}

.day {
  display: flex;
  flex-direction: column;
  padding-left: 2px;
  padding-right: 2px;

  .taskbar {
    display: flex;
    background-color: rgb(3, 155, 229);
    border-radius: 10px;
    line-height: 20px;
    height: 22px;
    text-align: left;
    padding-left: 10px;
    color: #fff;
    margin-bottom: 3px;
    cursor: pointer;
    // justify-content:space-around;
  }
}

.el-popover {
  z-index: 900;
}

.div_date_picker {
  cursor: pointer;
}
</style>
