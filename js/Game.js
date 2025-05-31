import CanvasManager from "./CanvasManager.js";
import Player from "./Player.js";
import Levels from "./Levels.js";
import Renderer from "./Renderer.js";
import Input from "./Input.js";
import Tiles from "./Tiles.js";

class Game {
    static instance;
    constructor() {
        Game.instance = this;
        this.canvas = document.getElementById("canvas1");
        this.ctx = new CanvasManager(this.canvas, 192, 256);

        this.restartButton = document.getElementById("restart");
        this.restartButton?.addEventListener("click", () => this.restart());

        this.menuButton = document.getElementById("menu-button");
        this.menuButton?.addEventListener("click", () => {
            if (
                document.documentElement.style.getPropertyValue(
                    "--menu-visible"
                ) == 0 ||
                document.documentElement.style.getPropertyValue(
                    "--menu-visible"
                ) === ""
            ) {
                document.documentElement.style.setProperty(
                    "--menu-visible",
                    100
                );
            } else {
                document.documentElement.style.setProperty("--menu-visible", 0);
            }
        });

        // document.addEventListener("click", () => {
        //     document.body.requestFullscreen();
        // });

        this.closeButton = document.getElementById("close-button");
        this.closeButton?.addEventListener("click", () => {
            document.documentElement.style.setProperty("--menu-visible", 0);
        });

        this.levels = new Levels(this.canvas);
        this.input = new Input(this);
        this.player = new Player(this.levels, this.ctx, this.input);
        this.input.player = this.player;
        this.renderer = new Renderer(this.levels, this.player, this.ctx, this);
        this.player.renderer = this.renderer;
        this.tiles = new Tiles(this.levels, this.ctx, this.renderer);

        this.leftButton = document.getElementById("menu-left");
        this.leftButton?.addEventListener("click", () => {
            if (
                document.documentElement.style.getPropertyValue(
                    "--menu-visible"
                ) == 100
            ) {
                if (this.levels.level == 0) {
                    this.levels.level = this.levels.levels.length - 1;
                } else {
                    this.levels.level--;
                }

                this.restart();
                document.documentElement.style.setProperty(
                    "--canvas-scale",
                    this.levels.getZoom(this.levels.level)
                );

                document.documentElement.style.setProperty("--menu-visible", 0);
            }
        });

        this.rightButton = document.getElementById("menu-right");
        this.rightButton?.addEventListener("click", () => {
            if (
                document.documentElement.style.getPropertyValue(
                    "--menu-visible"
                ) == 100
            ) {
                if (this.levels.level + 1 >= this.levels.levels.length) {
                    this.levels.level = 0;
                } else {
                    this.levels.level++;
                }

                this.restart();
                document.documentElement.style.setProperty(
                    "--canvas-scale",
                    this.levels.getZoom(this.levels.level)
                );

                document.documentElement.style.setProperty("--menu-visible", 0);
            }
        });

        this.lastFrame = Date.now();
        requestAnimationFrame(() => this.update());

        document.documentElement.style.setProperty(
            "--canvas-scale",
            this.levels.getZoom(this.levels.level)
        );

        setTimeout(() => {
            document.documentElement.style.setProperty("--scale-speed", "1s");
        }, 100);

        const levelsToChange = this.levels;

        fetch("/js/levels.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }

                return response.json();
            })
            .then((json) => {
                levelsToChange.levels = json;
            })
            .catch(function (error) {
                console.log("Failed to fetch levels 1");
                fetch(
                    "https://raw.githubusercontent.com/Pokehunter88/TileQuest/refs/heads/main/js/levels.json"
                )
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("HTTP error " + response.status);
                        }

                        return response.json();
                    })
                    .then((json) => {
                        levelsToChange.levels = json;
                    })
                    .catch(function (error) {
                        console.log("Failed to fetch levels 2");
                        console.log(error);
                    });
            });
    }

    update() {
        const delta = (Date.now() - this.lastFrame) / 1000;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#1E1F3B";
        this.ctx.fillRect(0, 0, 192, 256);

        this.tiles.drawTiles();
        this.player.update(delta);
        this.renderer.update(delta);

        this.lastFrame = Date.now();

        requestAnimationFrame(() => this.update());
    }

    restart() {
        this.player.restart();
        this.levels.restart();
        this.renderer.restart();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => new Game(), 100);
});
