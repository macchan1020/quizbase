let quizData = {};
let currentQuizNo = 0;
let correctCount = 0;
 
// 問題データの取得
get_quiz_data();
// トップ画面の生成
generate_top_content();
// 問題開始のイベント設定
register_start_event();
 
//問題のデータを取得する
function get_quiz_data() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        quizData = xhr.response;
    }
    xhr.open('GET', 'quiz.json');
    xhr.responseType = "json";
    xhr.send();
}
 
// 問題開始のイベントを設定する
function register_start_event() {
    document.querySelector('.js-quiz-start').addEventListener('click', function() {
        // 問題画面の生成
        generate_quiz_content();
        // 問題の選択肢を選択したときのイベント設定
        register_choice_event();
    }, false);
}
 
//問題の選択肢を選択したときのイベントを設定する
function register_choice_event() {
    for (var i = 0; i < document.querySelectorAll('.js-quiz-choice').length; i++) {
        document.querySelectorAll('.js-quiz-choice')[i].addEventListener('click', function(e) {
            // 回答・解説画面の生成
            generate_answer_content(parseFloat(this.getAttribute('data-quiz_choice')));
            // 未回答の問題がある場合
            if(currentQuizNo + 1 < quizData['quiz'].length) {
                // 次の問題へ遷移するときのイベント設定
                register_nextquiz_event();
            // 全て回答済の場合
            } else {
                // 結果画面へ遷移するときのイベント設定
                register_result_event();
            }
        }, false);
    }
}
//ヒントのイベントを設定する
function clickBtn2(){
	const p2 = document.getElementById("p2");

	if(p2.style.visibility=="visible"){
		// hiddenで非表示
		p2.style.visibility ="hidden";
	}else{
		// visibleで表示
		p2.style.visibility ="visible";
	}
}

//次の問題へ遷移するときのイベントを設定する
function register_nextquiz_event() {
    document.querySelector('.js-quiz-next').addEventListener('click', function() {
        currentQuizNo++;
        // 問題画面の生成
        generate_quiz_content();
        // 問題の選択肢を選択したときのイベント設定
        register_choice_event();
    }, false);
}
 
//結果画面へ遷移するときのイベントを設定する
function register_result_event() {
    document.querySelector('.js-quiz-result').addEventListener('click', function() {
        // 結果画面の生成
        generate_result_content();
        // トップへ遷移するときのイベント設定
        register_top_event();
    }, false);
}
 
//トップへ遷移するときのイベントを設定する
function register_top_event() {
    document.querySelector('.js-quiz-top').addEventListener('click', function() {
        // 値のリセット
        currentQuizNo = 0;
        correctCount = 0;
        // トップ画面の生成
        generate_top_content();
        // 問題開始のイベント設定
        register_start_event();
    }, false);
    // document.querySelector('body').style.backgroundImage = "url()"
}
 
//トップ画面を生成する
function generate_top_content() {
    var ins = '<div class="p-quiz">'
    ins += '<img class="saizu1" src="quizfont.png" alt="画像">';
    ins += '<img class="saizu2" src="10mon.png" alt="画像">';
    ins += '<div class="p-quiz-next">';
        ins += '<button class="c-btn2 js-quiz-start">開始</button>';
    ins += '</div>';
    ins += '</div>';
    // 画面幅を帰る記述
    var windowWidth = window.outerWidth;
    var windowSm = 480;
        if (windowWidth <= windowSm) {
        //横幅480px以下（スマホ）に適用させるJavaScriptを記述
            document.querySelector('body').style.backgroundImage = "url(sp-bg_top.png)"
        } else {
        //横幅480px以上（PC、タブレット）に適用させるJavaScriptを記述
            document.querySelector('body').style.backgroundImage = "url(pc-bg_top.jpg)"
        }
 
    document.querySelector('.js-quiz-content').innerHTML = ins;
}
 
//問題画面を生成する
function generate_quiz_content() {
    var ins = '<div class="p-quiz">'
    // ins += '<img class="saizu" src="quizfont2.png" alt="画像">';
    ins += '<div class="waku">';
    ins += '<h1>' + quizData['quiz'][currentQuizNo]['m'] + '</h1>';
    ins += '<h2 class="p-quiz-ttl">' + quizData['quiz'][currentQuizNo]['q'] + '</h2>';
    ins += '<h2 class="p-quiz-ttl">' + quizData['quiz'][currentQuizNo]['q2'] + '</h2>';
    ins += '<ol class="p-quiz-choices">';
        for (var i = 0; i < quizData['quiz'][currentQuizNo]['a'].length; i++) {
            ins += '<li class="p-quiz-choices__item">';
                ins += '<button class="c-btn js-quiz-choice" data-quiz_choice="' + (i+1) + '">' + quizData['quiz'][currentQuizNo]['a'][i] + '</button>';
            ins += '</li>';
        }
    ins += '</ol>';
    ins += '<input class="hin" type="button" value="ヒント" onclick="clickBtn2()">';
    ins += '<p id="p2" id="ma-ka">' + quizData['quiz'][currentQuizNo]['hinto'] + '</p>';
    // ins += '</div>';
    ins += '</div>';
 
    document.querySelector('.js-quiz-content').innerHTML = ins;
    document.querySelector("#p2").style.visibility ="hidden";
    document.querySelector('body').style.backgroundImage = "url(bg_question.png)"
}
 
//回答・解説画面を生成する
//関数choice - 選択した回答番号
function generate_answer_content(choice) {
    var ins="";
    ins += '<div class="waku1">';
    // 正解の場合
    if(quizData['quiz'][currentQuizNo]['correct'] === choice) {
        ins += '<h1 id="a" class="p-quiz-result">正解</h1>';
        correctCount++;
    // 不正解の場合
    } else {
        ins += '<h1 id="a" class="p-quiz-result">不正解</h1>';
    }
    ins += '<p class="p-quiz-commentary" id="ma-ka">' + quizData['quiz'][currentQuizNo]['commentary'] + '</p>';
    // 未回答の問題がある場合
    if(currentQuizNo + 1 < quizData['quiz'].length) {
        ins += '<div class="p-quiz-next">';
            ins += '<button class="c-btn2 js-quiz-next">次の問題</button>';
        ins += '</div>';
    // 全て回答済の場合
    } else {
        ins += '<div class="p-quiz-next">';
            ins += '<button class="c-btn2 js-quiz-result">結果を見る</button>';
        ins += '</div>';
    }
    ins += '</div>';
 
    document.querySelector('.js-quiz-content').innerHTML = ins;
}
 
//結果画面を生成する
function generate_result_content() {
    var ins = '<div class="waku1">'+ '<h1 id="a" class="p-quiz-ttl">結果は' + (currentQuizNo+1) + '問中' + correctCount + '問正解でした</h1>';
    for (var i = 0; i < quizData['rank'].length; i++) {
        if(correctCount >= quizData['rank'][i]['count']) {
            ins += '<p class="p-quiz-commentary">' + quizData['rank'][i]['comment'] + '</p>';
            break;
        }
    }
    ins += '<div class="p-quiz-next">';
        ins += '<button class="c-btn2 js-quiz-top">もう一度挑戦</button>';
    ins += '</div>';
    ins += '<div class="p-quiz-next>';
        ins += '<button class="c-btn2"><a href="top.html">TOPへ</a></button>';
    ins += '</div>';
    ins += '</div>'; 
    document.querySelector('.js-quiz-content').innerHTML = ins;
}


