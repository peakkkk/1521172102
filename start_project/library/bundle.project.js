require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Game":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'c22a24U9zJHR6U5amOyL5SK', 'Game');
// scripts/Game.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        maxStarDuration: 0,
        minStarDuration: 0,
        ground: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        }

    },
    onLoad: function onLoad() {
        this.groundY = this.ground.y + this.ground.height / 2;
        this.spawnNewStar();
    },
    spawnNewStar: function spawnNewStar() {
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent('Star').game = this;
    },
    getNewStarPosition: function getNewStarPosition() {
        var randX = 0;
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
        var maxX = this.node.width / 2;
        randX = cc.randomMinus1To1() * maxX;
        return cc.p(randX, randY);
    }

});

cc._RF.pop();
},{}],"Player":[function(require,module,exports){
"use strict";
cc._RF.push(module, '1b781yBsM9FZ7bkqCjh+Nzz', 'Player');
// scripts/Player.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight: 0,
        jumpDuration: 0,
        maxMoveSpeed: 0,
        accel: 0 // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },
    setJumpAction: function setJumpAction() {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },
    setInputControl: function setInputControl() {
        var self = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            switch (event.keyCode) {
                case cc.KEY.a:
                    self.accleft = true;
                    break;
                case cc.KEY.d:
                    self.accright = true;
                    break;
            }
        });
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
            switch (event.keyCode) {
                case cc.KEY.a:
                    self.accleft = false;
                    break;
                case cc.KEY.d:
                    self.accright = false;
                    break;
            }
        });
    },
    onLoad: function onLoad() {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        this.accleft = false;
        this.accright = false;
        this.xSpeed = 0;
        this.setInputControl();
    },
    update: function update(dt) {
        if (this.accleft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accright) {
            this.xSpeed += this.accel * dt;
        }
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }this.node.x += this.xSpeed * dt;
    }
});

cc._RF.pop();
},{}],"Star":[function(require,module,exports){
"use strict";
cc._RF.push(module, '5e432yvnx1IMrCy6CCudz5p', 'Star');
// scripts/Star.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,
        game: {
            default: null,
            serializable: false
        } // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {},
    getPlayerDistance: function getPlayerDistance() {
        var playerPos = this.game.player.getPosition();
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },
    onPicked: function onPicked() {
        this.game.spawnNewStar();
        this.node.destroy();
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
            return;
        }
    }
});

cc._RF.pop();
},{}]},{},["Game","Player","Star"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWUuanMiLCJhc3NldHMvc2NyaXB0cy9QbGF5ZXIuanMiLCJhc3NldHMvc2NyaXB0cy9TdGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRk87QUFJWDtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBRkc7QUFJUDtBQUNJO0FBQ0E7QUFGRzs7QUFYQztBQWlCWjtBQUNJO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVIOztBQXJDSTs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWJRO0FBZWhCO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNBO0FBQ0E7QUFDSTtBQUNFO0FBQ0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5KO0FBUUg7QUFDRDtBQUVJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTko7QUFRSDtBQUFFO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQztBQUNEO0FBQ0k7QUFDSTtBQUNIO0FBRUc7QUFDSDtBQUNEO0FBQ0k7QUFFSDtBQUVKO0FBbEVROzs7Ozs7Ozs7O0FDQVQ7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBRkM7QUFJTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFkUTs7QUFpQlo7QUFDQTtBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDSDs7QUFFRDtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ0g7QUFDSjtBQXZDSSIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3RhclByZWZhYjp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5QcmVmYWJcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1heFN0YXJEdXJhdGlvbjowLFxyXG4gICAgICAgIG1pblN0YXJEdXJhdGlvbjowLFxyXG4gICAgICAgIGdyb3VuZDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbGF5ZXI6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ncm91bmRZID0gdGhpcy5ncm91bmQueSArIHRoaXMuZ3JvdW5kLmhlaWdodC8yO1xyXG4gICAgICAgIHRoaXMuc3Bhd25OZXdTdGFyKCk7XHJcbiAgICB9LFxyXG4gICAgc3Bhd25OZXdTdGFyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIG5ld1N0YXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN0YXJQcmVmYWIpO1xyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdTdGFyKTtcclxuICAgICAgICBuZXdTdGFyLnNldFBvc2l0aW9uKHRoaXMuZ2V0TmV3U3RhclBvc2l0aW9uKCkpO1xyXG4gICAgICAgIG5ld1N0YXIuZ2V0Q29tcG9uZW50KCdTdGFyJykuZ2FtZSA9IHRoaXM7XHJcbiAgICB9LFxyXG4gICAgZ2V0TmV3U3RhclBvc2l0aW9uOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHJhbmRYPTA7XHJcbiAgICAgICAgdmFyIHJhbmRZID0gdGhpcy5ncm91bmRZICsgY2MucmFuZG9tMFRvMSgpICogdGhpcy5wbGF5ZXIuZ2V0Q29tcG9uZW50KCdQbGF5ZXInKS5qdW1wSGVpZ2h0ICsgNTA7XHJcbiAgICAgICAgdmFyIG1heFggPSB0aGlzLm5vZGUud2lkdGgvMjtcclxuICAgICAgICByYW5kWCA9IGNjLnJhbmRvbU1pbnVzMVRvMSgpICogbWF4WDtcclxuICAgICAgICByZXR1cm4gY2MucChyYW5kWCwgcmFuZFkpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAganVtcEhlaWdodDowLFxyXG4gICAgICAgIGp1bXBEdXJhdGlvbjowLFxyXG4gICAgICAgIG1heE1vdmVTcGVlZDowLFxyXG4gICAgICAgIGFjY2VsOjAvLyBmb286IHtcclxuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLCAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxyXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgfSxcclxuc2V0SnVtcEFjdGlvbjpmdW5jdGlvbiAoKXtcclxuICAgIHZhciBqdW1wVXA9Y2MubW92ZUJ5KHRoaXMuanVtcER1cmF0aW9uLGNjLnAoMCx0aGlzLmp1bXBIZWlnaHQpKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uT3V0KCkpO1xyXG4gICAgdmFyIGp1bXBEb3duPWNjLm1vdmVCeSh0aGlzLmp1bXBEdXJhdGlvbixjYy5wKDAsLXRoaXMuanVtcEhlaWdodCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKTtcclxuICAgIHJldHVybiBjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGp1bXBVcCxqdW1wRG93bikpXHJcbn0sXHJcbnNldElucHV0Q29udHJvbDpmdW5jdGlvbiAoKXtcclxudmFyIHNlbGY9dGhpcztcclxuY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIHN3aXRjaChldmVudC5rZXlDb2RlKXtcclxuICAgICAgY2FzZSBjYy5LRVkuYTpcclxuICAgICAgICBzZWxmLmFjY2xlZnQ9dHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIGNjLktFWS5kOlxyXG4gICAgICAgIHNlbGYuYWNjcmlnaHQ9dHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgfVxyXG59KVxyXG5jYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLGZ1bmN0aW9uKGV2ZW50KVxyXG57XHJcbiAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSl7XHJcbiAgICAgICAgY2FzZSBjYy5LRVkuYTpcclxuICAgICAgICBzZWxmLmFjY2xlZnQ9ZmFsc2U7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBjYy5LRVkuZDpcclxuICAgICAgICBzZWxmLmFjY3JpZ2h0PWZhbHNlO1xyXG4gICAgICAgIGJyZWFrOyAgXHJcbiAgICB9XHJcbn0pfSxcclxub25Mb2FkOmZ1bmN0aW9uKCl7XHJcbnRoaXMuanVtcEFjdGlvbj10aGlzLnNldEp1bXBBY3Rpb24oKTtcclxudGhpcy5ub2RlLnJ1bkFjdGlvbih0aGlzLmp1bXBBY3Rpb24pO1xyXG50aGlzLmFjY2xlZnQ9ZmFsc2U7XHJcbnRoaXMuYWNjcmlnaHQ9ZmFsc2U7XHJcbnRoaXMueFNwZWVkPSAwO1xyXG50aGlzLnNldElucHV0Q29udHJvbCgpO1xyXG59LFxyXG51cGRhdGU6ZnVuY3Rpb24oZHQpe1xyXG4gICAgaWYodGhpcy5hY2NsZWZ0KXtcclxuICAgICAgICB0aGlzLnhTcGVlZCAtPSB0aGlzLmFjY2VsKmR0O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZih0aGlzLmFjY3JpZ2h0KXtcclxuICAgICAgICB0aGlzLnhTcGVlZCArPSB0aGlzLmFjY2VsKmR0O1xyXG4gICAgfVxyXG4gICAgaWYoTWF0aC5hYnModGhpcy54U3BlZWQpPnRoaXMubWF4TW92ZVNwZWVkKXtcclxuICAgICAgICB0aGlzLnhTcGVlZD10aGlzLm1heE1vdmVTcGVlZCp0aGlzLnhTcGVlZC9NYXRoLmFicyh0aGlzLnhTcGVlZCk7XHJcbiAgICAgICBcclxuICAgIH0gdGhpcy5ub2RlLnggKz0gdGhpcy54U3BlZWQqZHQ7XHJcbiAgICBcclxufSxcclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgXHJcblxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIC8vIH0sXHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHBpY2tSYWRpdXM6MCxcclxuICAgICAgICBnYW1lOntcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6ZmFsc2VcclxuICAgICAgICAgfS8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXHJcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9LCBcclxuICAgIGdldFBsYXllckRpc3RhbmNlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHBsYXllclBvcyA9dGhpcy5nYW1lLnBsYXllci5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHZhciBkaXN0ID0gY2MucERpc3RhbmNlKHRoaXMubm9kZS5wb3NpdGlvbixwbGF5ZXJQb3MpO1xyXG4gICAgICAgIHJldHVybiBkaXN0O1xyXG4gICAgfSxcclxuICAgIG9uUGlja2VkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmdhbWUuc3Bhd25OZXdTdGFyKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgaWYodGhpcy5nZXRQbGF5ZXJEaXN0YW5jZSgpPHRoaXMucGlja1JhZGl1cyl7XHJcbiAgICAgICAgICAgIHRoaXMub25QaWNrZWQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9