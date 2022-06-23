// Definição de variáveis e arrays necessários
const answerArray = ['0-C', '1-A', '2-B', '3-C', '4-D', '5-A', '6-B', '7-A', '8-C', '9-D'];
let mainPage = document.getElementById("page-origin");
let questPage = document.getElementById("quiz-questions");
let curntPage = document.getElementById("question-0");
let questOption = document.querySelectorAll('.question-option');
let pageCounter = 0;
let hitCounter = 0;
let selectedOption = null;
let interval = null;
let confirmedAnswer = null;

function startQuiz(){
    // Função que começa o jogo
        // Agrega o evento click e função de seleção para cada opção
        // Esconde a página inicial e exibe a primeira questão
    questOption.forEach(option => {
        option.addEventListener('click', selectQuestion);
    });
    mainPage.style.display = 'none';
    questPage.style.display = 'flex';
    curntPage.style.display = 'flex';
    getTimer();
}
    function getTimer(){
        // Função que busca o timer da questão exibida através do pageCounter
        // Difine a quantida de "segundos" através do let timer
        // Chama a função responsável pelo cronômetro
        curntPage = document.getElementById(`question-${pageCounter}`);
        let curntTimer = document.getElementById(`timer-${pageCounter}`);
        curntTimer.innerHTML = 50;
        let timer = 50;
        const delay = setInterval(() => {
            clearInterval(delay);
            timePass(curntTimer, timer);
        }, 500)
    }

        function timePass(curntTimer, timer){
            // Função resposável pelo cronômetro
                // Ao chegar a zero passa a página automaticamente
            interval = setInterval(function(){
                if (timer <= 0){
                    passPage();
                    return
                } else {
                    curntTimer.innerHTML = timer;
                    timer--;
                }
            }, 1000)
        }

            function timeBreak(){
                // Pausa e apaga o cronômetro da questão
                clearInterval(interval);
                document.getElementById(`timer-${pageCounter}`).innerHTML = 0;
            }

    function selectQuestion(){
        // Seleciona a opção quando houver click
            // Muda a cor da opção selecionada e retorna seu nome para que aconteça a verificação
        if (selectedOption == null){
            selectedOption = this;
            selectedOption.style.backgroundColor = '#f5dc3b';
            return confirmedAnswer = selectedOption.name;
        } else {
            selectedOption.style.backgroundColor = '#f5eed4'
            selectedOption = this;
            selectedOption.style.backgroundColor = '#f5dc3b';
            return confirmedAnswer = selectedOption.name;
        }
    }

    function checkAnswer(){
        // Checa a reposta usando o array gabarito e o pageCounter
        // Ao verificar se houve seleção e a veracidade da mesma, passa para a próxima questão chamando passPage()
        if (checkSelection()){
            if (confirmedAnswer == answerArray[pageCounter]){hitCounter++;}
        } else{return}
        selectedOption = null;
        passPage();
    }

        function checkSelection(){
            // Checa se há opção selecionada
            if (selectedOption != null){return true;} 
            else {return false;}
        }

        function passPage(){
            // Ao ativar a função de passagem de página para e apaga o cronômetro da questão
            // Caso o jogador não tenha chegado na última questão, a função para a próxima
                // Caso tenha chegado, exibe a tela de GameOver com a pontuação feita
            timeBreak();
            if (pageCounter <= 8){
                let curntPage = document.getElementById(`question-${pageCounter}`);
                curntPage.style.display = 'none';
                let nextPage = document.getElementById(`question-${pageCounter+1}`);
                nextPage.style.display = 'flex';
                pageCounter++;
                getTimer();
            } else {
                let gameOver = document.getElementById("gameOver");
                let score = document.getElementById("score");
                score.innerHTML = `Sua pontuação: ${hitCounter}/10`
                gameOver.style.display = 'flex';
            }
        }