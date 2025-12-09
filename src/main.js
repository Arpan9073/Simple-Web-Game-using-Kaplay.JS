import kaplay from "kaplay";

let highestScore = 0;

const k = kaplay({
  width: 1000,
  height: 500,
});

const startext = k.add([k.text("Press Enter to start!"), k.pos(k.center())]);

k.scene("game", () => {
  k.loadBean();
  k.setGravity(1000);

  const player = k.add([
    k.sprite("bean"),
    k.area(),
    k.pos(45, 45),
    k.body(),
    "player",
  ]);

  const base = k.add([
    k.rect(k.width(), 300),
    k.pos(0, 500),
    k.outline(2),
    k.body({ isStatic: true }),
    k.area(),
  ]);

  player.onKeyPress("space", () => {
    if (player.isGrounded()) player.jump(450);
  });

  let counter = 0;
  const counterUI = k.add([k.text("0"), k.color(0, 0, 255)]);

  k.loop(2, () => {
    counterUI.text = counter.toString();
    counter++;

    const speeds = [250, 300, 230, 280];
    const currSpeed = speeds[Math.floor(Math.random() * speeds.length)];

    const box = k.add([
      k.rect(50, 50),
      k.pos(800, 500),
      k.outline(3),
      k.body(),
      k.area(),
      "boxes",
      move(180, currSpeed),
    ]);
  });

  k.scene("gameover", () => {
    if (highestScore < counter) highestScore = counter;
    k.add([k.text(`Height Score: ${highestScore.toString()}`)]);
    k.add([
      k.text(`Game over!\nScore: ${counter}\nPress Enter to play again`),
      k.pos(k.center()),
    ]);
    k.onKeyPress("enter", () => {
      go("game");
    });
  });

  k.onCollide("player", "boxes", () => {
    k.go("gameover");
  });
});

k.onKeyPress("enter", () => {
  startext.destroy();
  k.go("game");
});
