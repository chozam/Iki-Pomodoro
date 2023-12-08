class Timer {
    #time; //in second
    #starting_time = 0;
    #display_time;
    #display_minute;
    #display_second;
    #start = null;
    #btn_mulai;
    #btn_reset;
    #alarm; //assosiated with tag audio html

    constructor(waktu) {
        this.#starting_time = waktu;
        this.#time = this.#starting_time;
    }

    get_Time(){
        return this.#time;
    }

    set_Time(value) {
        this.#time = value; // don't forget to * 60 when initializing (convert to seconds)
    }

    get_Display_Time(){
        return this.#display_time;
    }

    set_Display_Time(value){
        this.#display_time = document.getElementById(value);
    }

    get_Display_minute(){
        return this.#display_minute;
    }

    set_Display_minute(value){
        this.#display_minute = document.getElementById(value);
    }

    get_Display_second(){
        return this.#display_second;
    }

    set_Display_second(value){
        this.#display_second = document.getElementById(value);
    }

    get_Button_Start(){
        return this.#btn_mulai;
    }

    set_Button_Start(value){
        this.#btn_mulai = document.getElementById(value);
    }

    get_Button_Reset(){
        return this.#btn_reset;
    }

    set_Button_Reset(value){
        this.#btn_reset = document.getElementById(value);
    }

    get_Start_State(){
        return this.#start;
    }

    set_Start_State(value){
        this.#start = value;
    }
    
    get_Alarm(){
        return this.#alarm;
    }

    set_Alarm(value){
        this.#alarm = document.getElementById(value);
    }

    update_Display() {
        let minute = Math.floor(this.#time/60);
        let second = Math.floor(this.#time%60);
        this.#display_time.style.fontSize = "100px";
        if (minute > 59){
            this.#display_time.style.fontSize = "80px";
            let hour = Math.floor(minute/60);
            minute = Math.floor(minute%60);
            if(hour < 10 && minute < 10) {
                this.#display_minute.innerHTML = "0" + hour + "." + "0" + minute;
            }
            else if(hour < 10 && minute > 10) {
                this.#display_minute.innerHTML = "0" + hour + "." + minute;
            }
            else {
                this.#display_minute.innerHTML = hour + "" + minute;
            }
        }
        else if(minute < 10) {
            this.#display_minute.innerHTML = "0" + minute;
        }
        else {
            this.#display_minute.innerHTML = minute;
        }

        if(second < 10) {
           this.#display_second.innerHTML = "0" + second;
        }
        else {
            this.#display_second.innerHTML = second;
        }
    }
    
    hitungMundur(){
        this.update_Display();
        if (this.#time == 0){
            clearInterval(this.#start)
            this.#start = null;
            this.#alarm.load();
            this.#alarm.play();
            setTimeout(this.mulai.bind(this), 2000);
        }
        this.#time--;
    }

    mulai(){
        if (!this.#start && this.#time !=0){
            this.#start = setInterval(this.hitungMundur.bind(this), 5);
            this.#btn_mulai.innerHTML = "STOP";
            this.#btn_mulai.style.backgroundColor = "#00987F"
        } else{
            clearInterval(this.#start);
            this.#btn_mulai.innerHTML = "START";
            this.#btn_mulai.style.backgroundColor = "#f44336"
            this.#start = null;
        }
    }

    reset(){
        clearInterval(this.#start);
        this.#btn_mulai.innerHTML = "START";
        this.#btn_mulai.style.backgroundColor = "#f44336"
        this.#start = null;
        this.#time = this.#starting_time;
    }

    notification(judul, body) {
        if ("Notification" in window) {
            Notification.requestPermission().then(function(permission) {
                if (permission === "granted") {
                    var notification = new Notification(judul, {
                        body: body,
                    });
                } else {
                console.log("Izin untuk pemberitahuan ditolak");
            }
        })
     } 
     else {
        console.log("Browser tidak mendukung pemberitahuan");
    }
    }
}


export class Pomodoro extends Timer { //This is inheritance
    #time_focus;
    #time_break;
    #time_longbreak;
    #long_break_interval;
    #acuan = 1;
    #total_focus; // html element for counting total focus time per session
    #total = 0; //for counting total focus time per session
    #label_state;
    #loop = 1;
    #enter_long_break = 1;
    #btn_focus;
    #btn_break;
    #btn_long_break;
    #btn_save;

    constructor(time_focus, time_break, time_longbreak, interval){
        super();
        this.#time_focus = time_focus;
        this.#time_break = time_break;
        this.#time_longbreak = time_longbreak;
        this.#long_break_interval = interval;
        this.set_Time(time_focus * 60);
    }

    get_Time_Focus(){
        return this.#time_focus;
    }

    set_Time_Focus(value){
        this.#time_focus = document.getElementById(value).value;
    }

    get_Time_Break(){
        return this.#time_break;
    }

    set_Time_Break(value){
        this.#time_break = document.getElementById(value).value;
    }

    get_Time_Long_Break(){
        return this.#time_longbreak;
    }

    set_Time_Long_Break(value){
        this.#time_longbreak = document.getElementById(value).value;
    }

    get_Long_Break_Interval(){
        return this.#long_break_interval;
    }

    set_Long_Break_Interval(value){
        this.#long_break_interval = document.getElementById(value).value;
    }
    
    get_Acuan(){
        return this.#acuan;
    }

    set_Acuan(value){
        this.#acuan = value;
    }

    get_Total_Focus(){
        return this.#total_focus;
    }

    set_Total_Focus(value=this.#total){
        this.#total_focus = document.getElementById(value);
    }

    get_Total(){
        return this.#total;
    }

    set_Total(value) {
        this.#total = value;
    }

    get_Label_State() {
        return this.#label_state;
    }

    set_Label_State(value){
        this.#label_state = document.getElementById(value);
    }

    get_Loop(){
        return this.#loop;
    }

    set_Loop(value){
        this.#loop= value;
    }

    get_Enter_Long_Break(){
        return this.#enter_long_break;
    }

    set_Enter_Long_Break(value){
        this.#enter_long_break= value;
    }

    get_Button_Focus() {
        return this.#btn_focus;
    }

    set_Button_Focus(value){
        this.#btn_focus = document.getElementById(value);
    }

    get_Button_Break(){
        return this.#btn_break;
    }

    set_Button_Break(value){
        this.#btn_break = document.getElementById(value);
    }

    get_Button_Long_Break(){
        return this.#btn_long_break;
    }

    set_Button_Long_Break(value){
        this.#btn_long_break = document.getElementById(value);
    }

    get_Button_Save(){
        return this.#btn_save;
    }

    set_Button_Save(value){
        this.#btn_save = document.getElementById(value);
    }

    session_mem(){
        const totalFocus = sessionStorage.getItem('total_focus');
        this.#total = JSON.parse(totalFocus);
        this.#total_focus.innerHTML = this.#total;
    }

    update_Time_Display(value) {
        // when user click state then display time also update with label
        this.update_Label(value);
        clearInterval(this.get_Start_State());
        this.set_Time(value * 60);
        this.get_Button_Start().innerHTML = "START";
        this.get_Button_Start().style.backgroundColor = "#f44336"
        this.set_Start_State(null);
        this.update_Display();
    }

    update_Label(value){
        if(value == this.#time_focus){
            this.#acuan = 1;
            this.#enter_long_break = 1;
            this.#label_state.innerHTML = "FOCUS";
        } else if (value == this.#time_break){
            this.#acuan = 2;
            this.#enter_long_break = 1;
            this.#label_state.innerHTML = "BREAK";
        } else if (value == this.#time_longbreak){
            this.#acuan = 3;
            this.#enter_long_break = 1;
            this.#label_state.innerHTML = "LONG BREAK";
        }
    }

    hitungMundur(){ //this is overriding method from class timer
        this.set_Time(this.get_Time()-1);
        this.update_Display();
        if (this.get_Time() == 0){
            clearInterval(this.get_Start_State())
            this.set_Start_State(null);
            this.#loop++;
            this.loop_Pomodoro();
            this.get_Alarm().load();
            this.get_Alarm().play();
            setTimeout(this.mulai.bind(this), 3000);
        }
        if (this.#loop % 2 == 1){
            this.#total_focus.innerHTML = this.#total++;
            sessionStorage.setItem("total_focus", JSON.stringify(this.#total))
        }
    }

    loop_Pomodoro(){
        if(this.#enter_long_break % this.#long_break_interval == 0){
            this.set_Time(this.#time_longbreak * 60);
            this.#label_state.innerHTML = "LONG BREAK";
            this.notification("Take A Break", "You've tried hard, i'm proud of you");
            this.#enter_long_break = 1;
        }else if(this.#loop % 2 == 0){
            this.set_Time(this.#time_break * 60);
            this.#label_state.innerHTML = "BREAK";
            this.notification("Take A lil Break", "Keep it up your hard work, Let's Go!");
        }else{
            this.set_Time(this.#time_focus * 60);
            this.#label_state.innerHTML = "FOCUS";
            this.notification("Yoo Time's' Up!", "Time to go back on focus, Fighting!!")
            this.#enter_long_break++;
        }
    }

    reset(){ //this is overriding method from class timer
        clearInterval(this.get_Start_State());
        this.get_Button_Start().innerHTML = "START";
        this.get_Button_Start().style.backgroundColor = "#f44336"
        this.set_Start_State(null);
        if (this.#acuan == 1) {
            this.set_Time(this.#time_focus * 60);
            this.update_Display();
            this.#loop = 1;
        }else if (this.#acuan == 2) {
            this.set_Time(this.#time_break * 60);
            this.update_Display();
            this.#loop = 2;
        }else if (this.#acuan == 3){
            this.set_Time(this.#time_longbreak * 60);
            this.update_Display();
            this.#loop = 4;
        }
    }

    save_Input(a, b, c, d){
        this.set_Time_Focus(a);
        this.set_Time_Break(b);
        this.set_Time_Long_Break(c);
        this.set_Long_Break_Interval(d)
        this.update_Time_Display(this.#time_focus);
    }
}