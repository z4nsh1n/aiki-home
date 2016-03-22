$("document").ready(function() {

    var Player = function(id) {

        var player;
        var timeoutId;
        var starttime = -1,
            endtime, duration, looping = true,
            videoId;

        var loadYTApi = function() {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/player_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        };

        loadYTApi();

        var loopFunc = (function() {
            console.log("looping: ", looping);
            if (looping) {
                player.seekTo(starttime);
            }
            else {
                player.pauseVideo();
                player.seekTo(starttime);
            }

        }).bind(this);
        /*global YT*/
        var apiReady = function() {
            player = new YT.Player(id, {
                width: 800,
                height: 600,
                events: {
                    onReady: function(ev) {
                        console.log("ready", player);
                        //make public for debugging
                        window.ytplayer = player;
                    },
                    onStateChange: function(ev) {
                        console.log("state: ", ev.data);
                        console.log("duration: ", duration);
                        if (ev.data === YT.PlayerState.ENDED) {}
                        if (ev.data === YT.PlayerState.PAUSED) {

                            if (timeoutId) {
                                clearInterval(timeoutId);
                            }
                            player.seekTo(starttime);
                        }
                        if (ev.data === YT.PlayerState.PLAYING && looping) {
                            var ct = player.getCurrentTime();

                            if (timeoutId) {
                                clearInterval(timeoutId);
                            }
                            if (ct > endtime || ct < starttime) {
                                player.seekTo(starttime);
                            }

                            timeoutId = setInterval(loopFunc, duration * 1000);
                        }
                    }
                }
            });
        }
        this.play = function(videoId, start, end, loop) {
            videoId = videoId;
            starttime = start;
            endtime = end;
            duration = end - start;
            if (loop === false) {
                looping = false;
            }
            player.loadVideoById({
                videoId: videoId,
                startSeconds: starttime
            });
        };
        apiReady = apiReady.bind(this);
        window.onYouTubePlayerAPIReady = apiReady;
    };



    var App = {
        models: {},
        collections: {},
        views: {},
    };

    App.models.Video = Backbone.Model.extend({
        defaults: {
            title: "",
            videoId: "",
            startSeconds: 0,
            endSeconds: 0
        },
    });

    App.collections.KensuburisCollection = Backbone.Collection.extend({
        model: App.models.Video,
    });
    App.collections.JosuburisCollection = Backbone.Collection.extend({
        model: App.models.Video
    });
    App.collections.TaisabakiCollection = Backbone.Collection.extend({
        model: App.models.Video
    });

    App.views.VideoView = Backbone.View.extend({
        tagName: 'li',
        render: function() {
            this.$el.append("<a href='#'>" +
                this.model.get('title') + "</a>");
            return this;

        },
        events: {
            'click': "clickHandler",
        },
        clickHandler: function(ev) {
            console.log(ev);
            console.log(this.model.get("end"));
            window.App.player.play(this.model.get("videoId"), this.model.get("startSeconds"), this.model.get("endSeconds"), true);
        },

    });

    App.views.VideosView = Backbone.View.extend({
        el: '.side-menu',
        render: function() {
            this.collection.each(function(video) {

                var videoView = new App.views.VideoView({
                    model: video
                });
                videoView.render();
                console.log(this.$el);
                this.$el.append(videoView.el);
                return this;
            }, this);
        },
    })
    var myPlayer = new Player("ytplayer");
    window.App = App;
    App.player = myPlayer;
    var kensuburisCollection = new App.collections.KensuburisCollection([{

        "title": "1st suburi",
        "videoId": "qQ8E6p9KVXo",
        "endSeconds": 145,
        "startSeconds": 133,
    }, {
        "title": "2nd suburi",
        "videoId": "qQ8E6p9KVXo",
        "endSeconds": 190,
        "startSeconds": 177,
    }, {
        "title": "3rd suburi",
        "videoId": "qQ8E6p9KVXo",
        "endSeconds": 248,
        "startSeconds": 221,
    }, {
        "title": "4th suburi",
        "videoId": "qQ8E6p9KVXo",
        "endSeconds": 342,
        "startSeconds": 328,
    }, {
        "title": "5th suburi",
        "videoId": "qQ8E6p9KVXo",
        "endSeconds": 380,
        "startSeconds": 366,
    }, {
        "title": "6th suburi",
        "videoId": "qQ8E6p9KVXo",
        "endSeconds": 455,
        "startSeconds": 440,
    }, {
        "title": "7th suburi",
        "videoId": "qQ8E6p9KVXo",
        "endSeconds": 512,
        "startSeconds": 495,
    }, {
        "title": "slomo side view",
        "videoId": "qQ8E6p9KVXo",
        "endSeconds": 971,
        "startSeconds": 692,
    }]);
    var josuburisCollection = new App.collections.JosuburisCollection([{
            "title": "jo suburi 1-5 (tsuki)",
            "videoId": "O9U04EU_Qp8",
            "endSeconds": 89,
            "startSeconds": 38,
        }, {
            "title": "jo suburi 6-10 (strikes)",
            "videoId": "O9U04EU_Qp8",
            "endSeconds": 149,
            "startSeconds": 89,
        }, {
            "title": "jo suburi 11-13 (katate)",
            "videoId": "O9U04EU_Qp8",
            "endSeconds": 184,
            "startSeconds": 149,
        }, {
            "title": "jo suburi 14-18 (hasso)",
            "videoId": "O9U04EU_Qp8",
            "endSeconds": 243,
            "startSeconds": 184,
        }, {
            "title": "jo suburi 19-20 (nagare gaishi)",
            "videoId": "O9U04EU_Qp8",
            "endSeconds": 272,
            "startSeconds": 243,
        }, {
            "title": "31 jo kata left to right",
            "videoId": "QMfN6EtKJHg",
            "endSeconds": 62,
            "startSeconds": 6,
        }, {
            "title": "31 jo kata right to left",
            "videoId": "QMfN6EtKJHg",
            "endSeconds": 123,
            "startSeconds": 63,
        }, {
            "title": "31 jo kata front",
            "videoId": "QMfN6EtKJHg",
            "endSeconds": 172,
            "startSeconds": 124,
        }, {
            "title": "6 jo kata left to right",
            "videoId": "kME3EwCs-SM",
            "startSeconds": 7,
            "endSeconds": 25
        }, {
            "title": "6 jo kata right to left",
            "videoId": "kME3EwCs-SM",
            "startSeconds": 27,
            "endSeconds": 46
        }, {
            "title": "6 jo close up 1,2,3",
            "videoId": "kME3EwCs-SM",
            "startSeconds": 48,
            "endSeconds": 60
        }

    ]);
    var taisabakiCollection = new App.collections.TaisabakiCollection([{
            "title": "1st tenkan",
            "videoId": "frMiYrH8E1k",
            "startSeconds": 10,
            "endSeconds": 17
        },
        {
            "title": "2nd tenkan",
            "videoId": "frMiYrH8E1k",
            "startSeconds": 21,
            "endSeconds": 36
        },
        {
            "title": "3rd tenkan",
            "videoId": "frMiYrH8E1k",
            "startSeconds": 41,
            "endSeconds": 49
        }

    ]);
    var kensuburisView = new App.views.VideosView({
        collection: kensuburisCollection
    });
    var josuburisView = new App.views.VideosView({
        collection: josuburisCollection
    });
    var taisabakiView = new App.views.VideosView({
        collection: taisabakiCollection
    });
   
    var renderhome = function(ev){
        $(".main-menu").children().removeClass("active")
        $(ev.target).parent().toggleClass("active");
        $(".side-menu").empty();
    }; 
    var renderken = function(ev) {
        $(".main-menu").children().removeClass("active")
        $(ev.target).parent().toggleClass("active");
        $(".side-menu").empty();
        kensuburisView.render();
    };
    var renderjo = function(ev) {
        $(".main-menu").children().removeClass("active")
        $(ev.target).parent().toggleClass("active");
        $(".side-menu").empty();
        josuburisView.render();
    };
    var rendertaisabaki = function(ev) {
        $(".main-menu").children().removeClass("active")
        $(ev.target).parent().toggleClass("active");
        $(".side-menu").empty();
        kensuburisView.render();
    };
    var rendertaisabaki = function(ev) {
        $(".main-menu").children().removeClass("active")
        $(ev.target).parent().toggleClass("active");
        $(".side-menu").empty();
        taisabakiView.render();
    };


    $("#home").click(renderhome);
    $("#kenmenu").click(renderken);
    $("#jomenu").click(renderjo);
    $("#taisabakimenu").click(rendertaisabaki);

});