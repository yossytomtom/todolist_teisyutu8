const app = new Vue({
  el: '#app', // Vueが管理する一番外側のDOM要素
  
  vuetify: new Vuetify(),
    // Vue内部で使いたい変数は全てこの中に定義する
  data: {
    // Vue内部で使いたい変数は全てこの中に定義する
    ID: '', //パラメーター「ID」格納変数
    state: '', //パラメーター「state」格納変数
    task: '',  //パラメーター「task」格納変数
    dataList: [], // データ表示用配列
    todoList: [], // これは配列
  //
    sizes: ['未了', '着手', '完了'],
        }, 
    isActive: false,
  methods: {
// タスク追加ボタンを押したときにメッセージを出す
buttonaddClicked:function(){
window.alert('タスク追加しました。頑張りましょう！')     
},
// タスク削除ボタンを押したときにメッセージを出す
buttondelClicked:function(){
window.alert('タスク完了ですね。さすがです！')     
},
addTask: function() {
      this.state = "未了", 
      console.log('次のタスクが追加されました：', this.task, this.state);
      // 配列の先頭に現在のタスク内容を追加する（最後尾の場合はpush）
      this.dataList.unshift(this.state , this.task);  
      console.log('現在のToDo一覧：', this.dataList);
      this.task = '';
    },
    // タスクの全件削除ボタンを押した場合
    clearAll: function() {
      this.todoList = [];
      console.log('全てのToDoが消去されました');
    },
//
//プルダウンリスト（未了・着手・完了）を変更したときの動き
  changeListStatus: async function(index,event) {
      console.log('ぷるだうん',index,event);
      this.isActive = !this.isActive;
      let table = document.getElementById('aaa');
      for (let i = 0 ; i <= index; i++){
        console.log('index：', index);
        console.log('i：', i);
        if (i == index) {
          i = i + 1;
          console.log('i---：', i);
          var tbl = document.getElementById('aaa');
          var ID = tbl.rows[i].cells[0].innerText;
          var State = event;
          const param = {
             ID : ID,
             state : State,
          };
          console.log("param:",param);
          //UPDATE用のAPIを呼び出し
          const response = await axios.post('https://m3h-toma-todolist.azurewebsites.net/api/UPDATE',param);
          await this.readtaskData();
        }
        else {}
      }
     },
    //
    //タスク内容を変更したときの動き
  changeTask: async function(index,event) {
      console.log('タスク内容',index,event);
      this.isActive = !this.isActive;
      let table = document.getElementById('aaa');
      for (let i = 0 ; i <= index; i++){
       console.log('index：', index);
        console.log('i：', i);
        if (i == index) {
          i = i + 1;
          console.log('i---：', i);
          var tbl = document.getElementById('aaa');
          var ID = tbl.rows[i].cells[0].innerText;
          //var Task = eventTask;
          const param = {
             ID : ID,
             task : event,
          };
          console.log("param:",param);
        //  UPDATE用のAPIを呼び出し
          const response = await axios.post('https://m3h-toma-todolist.azurewebsites.net/api/UPDTSK',param);
          await this.readtaskData();
        }
        else {}
      }
     },
    //
    //プルダウンで完了にしたら行を灰色に設定する。
    getBackgroundColor(data) {
      if (data.State == '完了') {
        return 'gray'
      } else 
        return 'wheat'
      {
      }
    },
    //
    //タスク削除（各行にある削除ボタンを押したとき）
    //
    delTodo: async function(index){
      console.log('削除するindex：', index);
      let table = document.getElementById('aaa');
      for (let i = 0 ; i <= index; i++){
        console.log('index：', index);
        console.log('i：', i);
        if (i == index) {
          console.log("一致");
          i = i + 1;
          console.log('i---：', i);
          var tbl = document.getElementById('aaa');
          var ID = tbl.rows[i].cells[0].innerText;
          const param = {
             ID : ID
          };
          console.log("param:",param);
          //DELETE用のAPIを呼び出し
          const response = await axios.post('https://m3h-toma-todolist.azurewebsites.net/api/DELETE',param);
          //結果をコンソールに出力
          await this.readtaskData();
        }
        else
         {
         }
      }
    },          
//    
//タスクテーブルの読み込み      
//
     readtaskData: async function() {
      //SELECT用のAPIを呼び出し    
      const response = await axios.get('https://m3h-toma-todolist.azurewebsites.net/api/SELECT');
      //結果をコンソールに出力
      console.log(response.data);     
      console.log('↑response.data');   
      //結果リストを表示用配列に代入
      this.dataList = response.data.List; 
      console.log('dataList：',  this.dataList);
      //console.log('ID：',  this.ID);
    },
    //
    //
    //タスク追加ボタン
    //
    addData: async function() {
      this.ID = 1,
      this.state = "未了"; 
      //POSTメソッドで送るパラメーターを作成
      const param = {
        ID : this.ID,
        state : this.state,
        task : this.task
      };
      //INSERT用のAPIを呼び出し
      const response = await axios.post('https://m3h-toma-todolist.azurewebsites.net/api/INSERT',param);
      this.task = '';
      //結果をコンソールに出力
      await this.readtaskData();
    },
    //
    //全TODO  クリアボタン
    //
    delAll: async function() {
      const response = await axios.post('https://m3h-toma-todolist.azurewebsites.net/api/DELALL');
      await this.readtaskData();
    },
    //
    //管理者用　初期データ復元ボタン（一度テーブルを全件削除して初期データをINSERTする）
    //
    insAll: async function() {
      await this.delAll();
      const response = await axios.post('https://m3h-toma-todolist.azurewebsites.net/api/INTALL');
      await this.readtaskData();
    }
  },
  //
  //試しテスト中
  //
      window:onload = async function() {  
        //window.addEventListener( "load" , alert("ページが開きました"));
        //window.addEventListener( "load" , readtaskData());
        //window.addEventListener("DOMContentLoaded",  readtaskData());
     //SELECT用のAPIを呼び出し    
      const response = await axios.get('https://m3h-toma-todolist.azurewebsites.net/api/SELECT');  
      //結果リストを表示用配列に代入
      this.dataList = response.data.List; 
      await this.readtaskData();
    },    
    
});