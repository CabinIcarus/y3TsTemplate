y3.game.event("ET_GAME_INIT", ()=>
{
    print("游戏初始化!@!@");
    const player = y3.player.alloc(1);
    print(player.get_name());
    const point = y3.point.alloc(0,0,0);
    print(point);
    const hero = player.create_unit(134274912 as any, point,0);
    hero.add_level(5);
    player.select_unit(hero);
});