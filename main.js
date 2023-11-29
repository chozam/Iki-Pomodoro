import { Pomodoro } from "./Timer.js";

const timer = new Pomodoro(25, 5, 15, 4);
timer.set_Label_State("label-state")
timer.set_Display_Time("timer")
timer.set_Display_minute("minute");
timer.set_Display_second("second");
timer.set_Button_Start("start");
timer.set_Button_Reset("reset");
timer.set_Button_Focus("btn-focus");
timer.set_Button_Break("btn-break");
timer.set_Button_Long_Break("btn-long-break");
timer.set_Time_Focus("set-pomodoro");
timer.set_Time_Break("set-break");
timer.set_Time_Long_Break("set-long-break");
timer.set_Long_Break_Interval("set-interval")
timer.set_Button_Save("save");
timer.set_Alarm("music");
timer.set_Total_Focus("total-focus");

timer.get_Button_Focus().addEventListener("click", () => timer.update_Time_Display(timer.get_Time_Focus()));
timer.get_Button_Break().addEventListener("click", () => timer.update_Time_Display(timer.get_Time_Break()));
timer.get_Button_Long_Break().addEventListener("click", () => timer.update_Time_Display(timer.get_Time_Long_Break()));
timer.get_Button_Save().addEventListener("click", () => timer.save_Input("set-pomodoro", "set-break", "set-long-break", "set-interval"));
timer.get_Button_Start().addEventListener("click", () => timer.mulai());
timer.get_Button_Reset().addEventListener('click', () => timer.reset()); //Kalau menggunakan .bind malah error. Mungkin karena bind itu
                                                                        //menyimpan yang dideklarasikan pertama, jadi jika nilainya diubah tidak bisa