y3.game.event(y3.Const.GlobalEventType.GAME_INIT, ()=>
{
    print("Event: ", y3.Const.GlobalEventType.GAME_INIT);
    const player = y3.player.alloc(1);
    print(player.get_name());
    const point = y3.point.alloc(0,0,0);
    print(point);
    const hero = player.create_unit(134274912 as any, point,0);
    hero.add_level(5);
    player.select_unit(hero);
    hero.add_ability(y3.Const.AbilityType.HERO, 134253684,5,1);

    const hud = y3.ui.get_ui(player, "GameHUD");

    const ui = y3.ui.create_ui(player, hud, y3.Const.UIComponentType.文本);
    ui.set_text(hero.get_name());
    print(ui);

    ui.add_event(y3.Const.UIEventMap["点击-开始"], "onClickTest");

    y3.game.event("界面-消息", "onClickTest", (data)=>
    {
        print("data.player: ", data.player);
        print("data.comp_name: ", data.comp_name);
        print("data.ui_event_name: ", data.ui_event_name);
        //todo 报错,error reading Python attribute/item
        // print("data.pos: ", data.pos);
        print("data.touch_id: ", data.touch_id);
    })
    
    y3.timer.wait(1, arg => {
        print("hello");
    })
});