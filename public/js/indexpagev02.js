jQuery(function ($) {
    "use strict";
    $(document).ready(function () {
        load_top_berita();
        getiklanhome1();
    });
    
    
    function load_top_berita() {
        postdata("/load_top_berita", { '_token': $('meta[name="_token"]').attr('content') }, function (data) {
            var featured_slider = "";
            var recentberita = "";
            $.each(data, function (key, value) {
                var nama_kategori = "";
                var nama_kategori2 = "";
                if (value.kategori) {
                    var kat = get_nama_kategori(value.kategori);
                    $.each(kat, function (key, value) {
                        nama_kategori += '<a class="post-cat" style="background:var(--'+ value.toLowerCase().split(" ").join("-") +')" href="/kategori/'+ value.toLowerCase().split(" ").join("-") +'">' + value + '</a>';
                        nama_kategori2 += '<a class="" style="color:var(--'+ value.toLowerCase().split(" ").join("-") +')" href="/kategori/'+ value.toLowerCase().split(" ").join("-") +'">' + value + '</a>';
                    });
                }
                recentberita += `<li>
                                    <div class="post-block-style media">
                                        <div class="post-thumb">
                                            <a href="/berita/`+ value.slug + `">
                                                <img class="img-fluid lazyload" data-src="`+ value.gambar +`" alt="">
                                            </a>
                                            <span class="tab-post-count"> `+ (+key + 1) +`</span>
                                        </div>

                                        <div class="post-content media-body">
                                            <div class="grid-category">
                                                `+ nama_kategori2 +`
                                            </div>
                                            <h2 class="post-title">
                                                <a href="/berita/`+ value.slug + `">`+ value.judul +`</a>
                                            </h2>
                                            <div class="post-meta mb-7">
                                                <span class="post-date"><i class="fa fa-clock-o"></i> `+ toformatdate(value.tgl_mulai_tayang) +`</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>`;
                featured_slider += `<div class="item post-overaly-style bgimg replace" style="background :url('` + value.gambar + `'); background-size:cover;">
                <div class="featured-post">
                    <a href="/berita/`+ value.slug + `" class="image-link">&nbsp;</a>
                    <div class="overlay-post-content">
                        <div class="post-content">
                            <div class="grid-category">`+ nama_kategori + `</div>
                            <h2 class="post-title title-lg">
                                <a href="/berita/`+ value.slug + `">`+ value.judul + `</a>
                            </h2>
                            <div class="post-meta">
                                <ul>
                                    <li><a href="/member/`+ value.slug_reporter + `"><i class="fa fa-user"></i> `+ value.reporter + `</a></li>
                                    <li><a href="/berita/`+ value.slug + `"><i class="icon icon-clock"></i> `+ toformatdate(value.tgl_mulai_tayang) + `</a></li>
                                    <li><a href="/berita/`+ value.slug + `" class="view"><i class="icon icon-fire"></i> `+ satuan_ribu(value.dilihat) + `</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
                if(key == (data.length -1)){
                    $("#featured-top-news .post-overaly-style").css("background","url('" + value.gambar + "')");
                    $("#featured-top-news .post-overaly-style").css("background-size:cover");
                    $("#featured-top-news .post-content").prepend(nama_kategori);
                    $("#featured-top-news .post-title a").attr('href',"/berita/"+value.slug);
                    $("#featured-top-news .post-title a").text(value.judul);
                    $("#featured-top-news .user-reporter").attr('href',"/member/"+value.slug_reporter);
                    $("#featured-top-news .user-reporter").append(value.reporter);
                    $("#featured-top-news .tgl-tayang").append(toformatdate(value.tgl_mulai_tayang));
                }
                if(key == (data.length -2)){
                    $("#featured-bottom-news .post-overaly-style").css("background","url('" + value.gambar + "')");
                    $("#featured-bottom-news .post-content").prepend(nama_kategori);
                    $("#featured-bottom-news .post-title a").attr('href',"/berita/"+value.slug);
                    $("#featured-bottom-news .post-title a").text(value.judul);
                    $("#featured-bottom-news .user-reporter").attr('href',"/member/"+value.slug_reporter);
                    $("#featured-bottom-news .user-reporter").append(value.reporter);
                    $("#featured-bottom-news .tgl-tayang").append(toformatdate(value.tgl_mulai_tayang));
                }
            });

            $('#listrecent').html(recentberita);
            $('#featured-slider').html(featured_slider);
            $(".featured-slider").owlCarousel({
                loop: true,
                autoplay: false,
                autoplayHoverPause: true,
                nav: false,
                margin: 0,
                loop: false,
                dots: true,
                mouseDrag: true,
                touchDrag: true,
                slideSpeed: 500,
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                items: 1,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    }
                }

            });

            getberitakampus();
        }, function (e) {

        });
    }

    function getberitakampus(){
        postdata("/frontend/kategorikhusus/4", { '_token': $('meta[name="_token"]').attr('content') }, function (data) {
            var featured_slider = "";
            var recentberita = "";
            $.each(data, function (key, value) {
                var nama_kategori = "";
                var nama_kategori2 = "";
                if (value.kategori) {
                    var kat = get_nama_kategori(value.kategori);
                    $.each(kat, function (key, value) {
                        nama_kategori += '<a class="post-cat" style="background:var(--'+ value.toLowerCase().split(" ").join("-") +')" href="/kategori/'+ value.toLowerCase().split(" ").join("-") +'">' + value + '</a>';
                        nama_kategori2 += '<a class="" style="color:var(--'+ value.toLowerCase().split(" ").join("-") +')" href="/kategori/'+ value.toLowerCase().split(" ").join("-") +'">' + value + '</a>';
                    });
                }
                recentberita += `<li>
                                    <div class="post-block-style media">
                                        <div class="post-thumb">
                                            <a href="/berita/`+ value.slug + `">
                                                <img class="img-fluid lazyload" data-src="`+ value.gambar +`" alt="">
                                            </a>
                                            <span class="tab-post-count"> `+ (+key + 1) +`</span>
                                        </div>

                                        <div class="post-content media-body">
                                            <div class="grid-category">
                                                `+ nama_kategori2 +`
                                            </div>
                                            <h2 class="post-title">
                                                <a href="/berita/`+ value.slug + `">`+ value.judul +`</a>
                                            </h2>
                                            <div class="post-meta mb-7">
                                                <span class="post-date"><i class="fa fa-clock-o"></i> `+ toformatdate(value.tgl_mulai_tayang) +`</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>`;
            });

            $('#listrecent').html(recentberita);

            getberitasorotan();
        }, function (e) {

        });
    }

    function load_populer_berita() {
        postdata("/load_populer_berita", { '_token': $('meta[name="_token"]').attr('content') }, function (data) {
            var listpopuler = "";
            $.each(data, function (key, value) {
                var nama_kategori = "";
                if (value.kategori) {
                    var kat = get_nama_kategori(value.kategori);
                    $.each(kat, function (key, value) {
                        nama_kategori += '<a class="" style="color:var(--'+ value.toLowerCase().split(" ").join("-") +')" href="/kategori/'+ value.toLowerCase().split(" ").join("-") +'">' + value + '</a>';
                    });
                }
                listpopuler += `<li>
                                    <div class="post-block-style media">
                                        <div class="post-thumb">
                                            <a href="/berita/`+ value.slug + `">
                                                <img class="img-fluid lazyload" data-src="`+ value.gambar +`" alt="">
                                            </a>
                                            <span class="tab-post-count"> `+ (+key + 1) +`</span>
                                        </div>

                                        <div class="post-content media-body">
                                            <div class="grid-category">
                                                `+ nama_kategori +`
                                            </div>
                                            <h2 class="post-title">
                                                <a href="/berita/`+ value.slug + `">`+ value.judul +`</a>
                                            </h2>
                                            <div class="post-meta mb-7">
                                                <span class="post-date"><i class="fa fa-clock-o"></i> `+ toformatdate(value.tgl_mulai_tayang) +`</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>`;
            });

            $('#listpopuler').html(listpopuler);
            load_lifestyle();
            getslidertengah();
        }, function (e) {

        });
    }

    function load_lifestyle() {
        postdata("/frontend/kategorikhusus/8", { '_token': $('meta[name="_token"]').attr('content') }, function (data) {
            var listpopuler = "";
            $.each(data, function (key, value) {
                var nama_kategori = "";
                if (value.kategori) {
                    var kat = get_nama_kategori(value.kategori);
                    $.each(kat, function (key, value) {
                        nama_kategori += '<a class="" style="color:var(--'+ value.toLowerCase().split(" ").join("-") +')" href="/kategori/'+ value.toLowerCase().split(" ").join("-") +'">' + value + '</a>';
                    });
                }
                listpopuler += `<li>
                                    <div class="post-block-style media">
                                        <div class="post-thumb">
                                            <a href="/berita/`+ value.slug + `">
                                                <img class="img-fluid lazyload" data-src="`+ value.gambar +`" alt="">
                                            </a>
                                            <span class="tab-post-count"> `+ (+key + 1) +`</span>
                                        </div>

                                        <div class="post-content media-body">
                                            <div class="grid-category">
                                                `+ nama_kategori +`
                                            </div>
                                            <h2 class="post-title">
                                                <a href="/berita/`+ value.slug + `">`+ value.judul +`</a>
                                            </h2>
                                            <div class="post-meta mb-7">
                                                <span class="post-date"><i class="fa fa-clock-o"></i> `+ toformatdate(value.tgl_mulai_tayang) +`</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>`;
            });

            $('#lifestyletab').html(listpopuler);
            load_sport();
            // getslidertengah();
        }, function (e) {

        });
    }

    function load_sport() {
        postdata("/frontend/kategorikhusus/7", { '_token': $('meta[name="_token"]').attr('content') }, function (data) {
            var listpopuler = "";
            $.each(data, function (key, value) {
                var nama_kategori = "";
                if (value.kategori) {
                    var kat = get_nama_kategori(value.kategori);
                    $.each(kat, function (key, value) {
                        nama_kategori += '<a class="" style="color:var(--'+ value.toLowerCase().split(" ").join("-") +')" href="/kategori/'+ value.toLowerCase().split(" ").join("-") +'">' + value + '</a>';
                    });
                }
                listpopuler += `<li>
                                    <div class="post-block-style media">
                                        <div class="post-thumb">
                                            <a href="/berita/`+ value.slug + `">
                                                <img class="img-fluid lazyload" data-src="`+ value.gambar +`" alt="">
                                            </a>
                                            <span class="tab-post-count"> `+ (+key + 1) +`</span>
                                        </div>

                                        <div class="post-content media-body">
                                            <div class="grid-category">
                                                `+ nama_kategori +`
                                            </div>
                                            <h2 class="post-title">
                                                <a href="/berita/`+ value.slug + `">`+ value.judul +`</a>
                                            </h2>
                                            <div class="post-meta mb-7">
                                                <span class="post-date"><i class="fa fa-clock-o"></i> `+ toformatdate(value.tgl_mulai_tayang) +`</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>`;
            });

            $('#sporttab').html(listpopuler);
            load_iptek();
            // getslidertengah();
        }, function (e) {

        });
    }

    function load_iptek() {
        postdata("/frontend/kategorikhusus/10", { '_token': $('meta[name="_token"]').attr('content') }, function (data) {
            var listpopuler = "";
            $.each(data, function (key, value) {
                var nama_kategori = "";
                if (value.kategori) {
                    var kat = get_nama_kategori(value.kategori);
                    $.each(kat, function (key, value) {
                        nama_kategori += '<a class="" style="color:var(--'+ value.toLowerCase().split(" ").join("-") +')" href="/kategori/'+ value.toLowerCase().split(" ").join("-") +'">' + value + '</a>';
                    });
                }
                listpopuler += `<li>
                                    <div class="post-block-style media">
                                        <div class="post-thumb">
                                            <a href="/berita/`+ value.slug + `">
                                                <img class="img-fluid lazyload" data-src="`+ value.gambar +`" alt="">
                                            </a>
                                            <span class="tab-post-count"> `+ (+key + 1) +`</span>
                                        </div>

                                        <div class="post-content media-body">
                                            <div class="grid-category">
                                                `+ nama_kategori +`
                                            </div>
                                            <h2 class="post-title">
                                                <a href="/berita/`+ value.slug + `">`+ value.judul +`</a>
                                            </h2>
                                            <div class="post-meta mb-7">
                                                <span class="post-date"><i class="fa fa-clock-o"></i> `+ toformatdate(value.tgl_mulai_tayang) +`</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>`;
            });

            $('#iptektab').html(listpopuler);
            // getslidertengah();
        }, function (e) {

        });
    }



    function getcountberita() {
        postdata("/getcountberita", { '_token': $('meta[name="_token"]').attr('content') }, function (data) {
            var listpopuler = "";
            $.each(data, function (key, value) {
                listpopuler += `<li>
                                    <a href="/kategori/`+ value.kategori.toLowerCase().split(" ").join("-") +`" style="background-image: url(../../gambar_kategori/`+ value.gambar +`)">
                                        <span> `+ value.kategori +` </span>
                                        <span class="bar"></span>
                                        <span class="category-count">`+ value.jumlah +`</span>
                                    </a>
                                </li>`;
            });
            $('#ts-category-list').html(listpopuler);
            getmoreberita();
        }, function (e) {

        });
    }



    function getdontmissed() {
        postdata("/frontend/subkategorikhusus/42", { '_token': $('meta[name="_token"]').attr('content') }, function (data) {
            var utama = "";
            var itemberita = "";
            $.each(data, function (key, value) {
                var nama_kategori = "";
                var nama_kategori2 = "";
                if (value.kategori) {
                    var kat = get_nama_kategori(value.kategori);
                    $.each(kat, function (key, value) {
                        nama_kategori += '<a class="post-cat" style="background:var(--'+ value.toLowerCase().split(" ").join("-") +')" href="/kategori/'+ value.toLowerCase().split(" ").join("-") +'">' + value + '</a>';
                        nama_kategori2 += '<a class="" style="color:var(--'+ value.toLowerCase().split(" ").join("-") +')" href="/kategori/'+ value.toLowerCase().split(" ").join("-") +'">' + value + '</a>';
                    });
                }
                if(key == 0){
                    utama+=`<div class="row align-items-center">
                                <div class="col-md-6">
                                    <div class="post-thumb">
                                        <img class="lazyload" data-src="`+ value.gambar +`" alt="">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="post-content">
                                        <h2 class="post-title title-md">
                                            <a href="/berita/`+ value.slug + `">`+ value.judul +`</a>
                                        </h2>
                                        <div class="post-meta mb-7">
                                            <span class="post-author"><a href="/member/`+ value.email +`"><i class="fa fa-user"></i> `+ value.name +`</a></span>
                                            <span class="post-date"><i class="fa fa-clock-o"></i> `+ toformatdate(value.tgl_mulai_tayang) +`</span>
                                        </div>
                                        <p>`+ value.caption +`</p>
                                    </div>
                                </div>
                            </div>`;
                }else{
                    itemberita += `<div class="col-md-6">
                                    <div class="list-post-block">
                                        <ul class="list-post">
                                            <li>
                                                <div class="post-block-style media">
                                                    <div class="post-thumb">
                                                        <a href="/berita/`+ value.slug + `">
                                                            <img class="img-fluid lazyload" data-src="`+ value.gambar +`" alt="">
                                                        </a>
                                                    </div>

                                                    <div class="post-content media-body">
                                                        <div class="grid-category">
                                                            `+ nama_kategori2 +`
                                                        </div>
                                                        <h2 class="post-title">
                                                            <a href="/berita/`+ value.slug + `">`+ value.judul +`</a>
                                                        </h2>
                                                        <div class="post-meta mb-7">
                                                            <span class="post-date"><i class="fa fa-clock-o"></i> `+ toformatdate(value.tgl_mulai_tayang) +`</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>`;
                }
            });
            $("#dontmiss1").html(utama);
            $("#dontmiss2").html(itemberita);
            getinfografis();
            //$('#ts-category-list').html(listpopuler);
        }, function (e) {

        });
    }

    function getberitasorotan() {
        postdata("/frontend/subkategorikhusus/33", { '_token': $('meta[name="_token"]').attr('content') }, function (data) {
            var utama = "";
            var itemberita = "";
            $.each(data, function (key, value) {
                var nama_kategori = "";
                var nama_kategori2 = "";
                if (value.kategori) {
                    var kat = get_nama_kategori(value.kategori);
                    $.each(kat, function (key, value) {
                        nama_kategori += '<a class="post-cat" style="background:var(--'+ value.toLowerCase().split(" ").join("-") +')" href="/kategori/'+ value.toLowerCase().split(" ").join("-") +'">' + value + '</a>';
                        nama_kategori2 += '<a class="" style="color:var(--'+ value.toLowerCase().split(" ").join("-") +')" href="/kategori/'+ value.toLowerCase().split(" ").join("-") +'">' + value + '</a>';
                    });
                }
                if(key == 0){
                    utama+=`<div class="post-block-style">
                                <div class="post-thumb">
                                    <a href="/berita/`+ value.slug +`">
                                        <img class="img-fluid lazyload" data-src="`+ value.gambar +`" alt="" />
                                    </a>
                                    <div class="grid-cat">
                                        `+ nama_kategori +`
                                    </div>
                                </div>

                                <div class="post-content">
                                    <h2 class="post-title title-md">
                                        <a href="/berita/`+ value.slug +`">`+ value.judul +`</a>
                                    </h2>
                                    <p>`+ value.caption +`</p>
                                    <div class="post-meta mb-7">
                                        <span class="post-author"><a href="/member/`+ value.slug_reporter +`"><i class="fa fa-user"></i> `+ value.name +`</a></span>
                                        <span class="post-date"><i class="fa fa-clock-o"></i> `+ toformatdate(value.tgl_mulai_tayang) +`</span>
                                    </div>
                                </div>
                            </div>`;
                }else{
                    itemberita += `<div class="col-md-6">
                                    <div class="post-block-style">
                                        <div class="post-thumb">
                                            <a href="/berita/`+ value.slug +`">
                                                <img class="img-fluid lazyload" data-src="`+ value.gambar +`" alt="" />
                                            </a>
                                        </div>

                                        <div class="post-content">
                                            <h2 class="post-title mb-2">
                                                <a href="/berita/`+ value.slug +`">`+ value.judul +`</a>
                                            </h2>
                                            <div class="post-meta mb-7">
                                                <span class="post-date"><i class="fa fa-clock-o"></i> `+ toformatdate(value.tgl_mulai_tayang) +`</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                }
            });
            $("#beritasorot").html(utama);
            $("#beritaitem").html(itemberita);
            load_kategori_trending();
            load_populer_berita();
            //$('#ts-category-list').html(listpopuler);
        }, function (e) {

        });
    }

    function getslidertengah() {
        postdata("/getytvideo", { '_token': $('meta[name="_token"]').attr('content') }, function (data) {
            var isi = "";
            $.each(data, function (key, value) {
                isi += `<div class="item">
                                <div class="post-block-style">
                                    <div class="post-thumb">
                                        <iframe id="Geeks3" style="width:100%" height="200"
                                                src="`+ value.url +`"
                                                frameborder="0" allowfullscreen>
                                        </iframe>
                                    </div>

                                    <div class="post-content">
                                        <h2 class="post-title">
                                            <a href="#Geeks2" data-toggle="modal">`+ value.judul +`</a>
                                        </h2>
                                        <div class="post-meta mb-7">
                                            <span class="post-date"><i class="fa fa-clock-o"></i> `+ toformatdate(value.created_at) +`</span>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
            });
            $('#post-block-slider').html(isi);
            $('#post-block-slider').owlCarousel({
                nav: false,
                items: 4,
                margin: 30,
                reponsiveClass: true,
                dots: true,
                autoplayHoverPause: true,
                loop: true,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 1,
                    },
                    // breakpoint from 480 up
                    480: {
                        items: 2,
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 2,
                    },
                    // breakpoint from 768 up
                    1200: {
                        items: 4,
                    }
                }
            });
            getdontmissed();
        }, function (e) {

        });
    }

    function getinfografis() {
        postdata("/getinfografis", { '_token': $('meta[name="_token"]').attr('content') }, function (data) {
            var isi = "";
            $.each(data, function (key, value) {
                isi += `<div class="item" style="cursor: pointer" onclick="previewgaleri('infografisslider')">
                                <div class="post-block-style">
                                    <div class="post-thumb">
                                        <img class="img-fluid lazyload" data-src="`+ value.gambar +`" alt="" />
                                    </div>

                                    <div class="post-content">
                                        <h2 class="post-title">
                                            <a>`+ value.nama +`</a>
                                        </h2>
                                    </div>
                                </div>
                            </div>`;
            });
            $('#post-infografis-slider').html(isi);
            $('#post-infografis-slider').owlCarousel({
                nav: false,
                items: 4,
                margin: 30,
                reponsiveClass: true,
                dots: true,
                autoplayHoverPause: true,
                loop: true,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 1,
                    },
                    // breakpoint from 480 up
                    480: {
                        items: 2,
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 2,
                    },
                    // breakpoint from 768 up
                    1200: {
                        items: 4,
                    }
                }
            });
            getgaleri();
        }, function (e) {

        });
    }

});