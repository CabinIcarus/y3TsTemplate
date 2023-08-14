
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
    const ui = y3.ui.create_ui(player, hud, 5);
    ui.set_pos(100,100);
    ui.set_anchor(100,100)
    ui.set_ui_size(150, 50)
    ui.set_visible(true);
    ui.set_text_color(255,255,255,255)
    ui.set_font_size(18);
    ui.set_text(hero.get_name());
    print(ui);
    
    y3.timer.wait(1, arg => {
        print("hello");
    })
});