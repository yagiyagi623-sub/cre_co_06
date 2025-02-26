import p5 from "p5";

new p5((p: p5) => {
    // 点の座標
    let route: { x: number; y: number; }[];

    // 割合
    let t: number;

    // 動く順番の制御
    let i: number;

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        route = [
            { x: p.width / 4, y: p.height / 4 },
            { x: p.width / 4 * 3, y: p.height / 4},
            { x: p.width / 4 * 3, y: p.height / 4 * 3},
            { x: p.width / 4, y: p.height / 4 * 3}
        ]

        t = 0;
        i = 0;

        p.noStroke();
    }

    p.draw = () => {
        // 正規化
        // p.norm(値, 下限, 上限)
        // 範囲での値の位置を求める関数

        // 線形補間
        // p.lerp(下限, 上限, 割合)
        // 範囲と割合から値を求める関数
        // 得に線形補間は、モノを動かす際の基本となる

        // マップ
        // p.map(値, 下限1, 上限1, 下限2, 上限2)
        // 範囲1での値の位置を範囲2に変換する関数

        p.clear();

        // --------------------------------------------------

        p.fill("#eaeaea");

        // routeをもとに点を描画
        route.forEach((r: { x: number, y: number }) => {
            p.circle(r.x, r.y, 20);
        })

        const prev: { x: number, y: number } = route[i];
        const next: { x: number, y: number } = route[(i + 1) % route.length];

        // 動く円のx, y座標
        const x = p.lerp(prev.x, next.x, t);
        const y = p.lerp(prev.y, next.y, t);

        p.circle(x, y, 10);

        t += 0.01;

        // 点に着いたら、リセットして次の点へ向かう
        if (t > 1) {
            t = 0;
            i++;
            i %= route.length; // 2から0に戻すための処理
        };

        // --------------------------------------------------

        p.fill("#339966");

        const max: number = p.dist(0, 0, p.width / 2, p.height / 2);
        const d: number = p.dist(p.width / 2, p.height / 2, p.mouseX, p.mouseY)

        // 「中心～マウスの距離」を、端～中心の距離をもとに逆にする
        const r: number = p.map(d, 0, max, max, 0);

        p.circle(p.width / 2, p.height / 2, r / 2);
    }
})