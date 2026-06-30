// Seleção de Elementos das Telas
const homeScreen = document.getElementById('home-screen');
const calcScreen = document.getElementById('calc-screen');
const resultScreen = document.getElementById('result-screen');

// Botões de navegação
const btnStart = document.getElementById('btn-start');
const btnRestart = document.getElementById('btn-restart');
const formAgro = document.getElementById('form-agro');

// Elementos de Saída (Resultados)
const scoreNumber = document.getElementById('score-number');
const scoreStatus = document.getElementById('score-status');
const recommendationsList = document.getElementById('recommendations-list');

// Transições de Tela
btnStart.addEventListener('click', () => {
    homeScreen.classList.add('hidden');
    calcScreen.classList.remove('hidden');
});

btnRestart.addEventListener('click', () => {
    resultScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
    formAgro.reset(); // Limpa o formulário para o próximo uso
});

// Lógica do Cálculo de Sustentabilidade
formAgro.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar

    // Pegando valores numéricos
    const water = Number(document.getElementById('water-input').value);
    const area = Number(document.getElementById('area-input').value);

    // Pegando os estados dos checkboxes (true/false)
    const hasSmartIrrigation = document.getElementById('chk-irrigation').checked;
    const hasRainwater = document.getElementById('chk-rain').checked;
    const hasReserve = document.getElementById('chk-reserve').checked;
    const hasRecycle = document.getElementById('chk-recycle').checked;
    const hasSolar = document.getElementById('chk-solar').checked;

    // --- CÁLCULO DA PONTUAÇÃO ---
    let score = 0;

    // 1. Lógica do consumo de água por hectare
    // Se a propriedade usa menos de 300L por hectare, ganha pontuação máxima em água
    const waterPerHectare = water / area;
    if (waterPerHectare <= 300) {
        score += 25;
    } else if (waterPerHectare <= 1000) {
        score += 15;
    } else {
        score += 5;
    }

    // 2. Pontos adicionais por boas práticas (15 pontos por item marcado)
    if (hasSmartIrrigation) score += 15;
    if (hasRainwater) score += 15;
    if (hasReserve) score += 15;
    if (hasRecycle) score += 15;
    if (hasSolar) score += 15;

    // Garante que a pontuação máxima não ultrapasse 100 devido aos arredondamentos
    score = Math.min(score, 100);

    // --- RENDERIZAR RESULTADO ---
    scoreNumber.innerHTML = score;
    
    // Arrays para armazenar as recomendações dinâmicas
    let recommendations = [];

    // Verificação de faixas de pontuação e medalhas (Diferencial)
    if (score <= 40) {
        scoreStatus.innerHTML = "⚠️ Sustentabilidade baixa";
        scoreStatus.style.backgroundColor = "#FFCDD2"; // Vermelho claro
        scoreStatus.style.color = "#C62828";
    } else if (score <= 70) {
        scoreStatus.innerHTML = "🟡 Sustentabilidade média [🥈 Prata]";
        scoreStatus.style.backgroundColor = "#FFF9C4"; // Amarelo claro
        scoreStatus.style.color = "#F57F17";
    } else {
        scoreStatus.innerHTML = "🟢 Excelente sustentabilidade [🥇 Ouro]";
        scoreStatus.style.backgroundColor = "#C8E6C9"; // Verde claro
        scoreStatus.style.color = "#2E7D32";
    }

    // Criando dicas personalizadas com base no que NÃO foi marcado
    if (!hasSmartIrrigation) {
        recommendations.push("💧 <strong>Dica:</strong> Economize água instalando sistemas de irrigação inteligente por gotejamento.");
    } else {
        recommendations.push("✔ Parabéns por utilizar sistemas eficientes de irrigação!");
    }

    if (!hasRainwater) {
        recommendations.push("🌧️ <strong>Dica:</strong> Implemente sistemas de captação da água da chuva para reduzir o uso de fontes naturais.");
    }

    if (!hasReserve) {
        recommendations.push("🌳 <strong>Dica:</strong> Preserve ou recomponha as matas ciliares e áreas de reserva legal da sua propriedade.");
    } else {
        recommendations.push("✔ Excelente iniciativa manter sua reserva ambiental intacta.");
    }

    if (!hasRecycle) {
        recommendations.push("♻️ <strong>Dica:</strong> Faça o descarte correto e a tríplice lavagem das embalagens de defensivos agrícolas.");
    }

    if (!hasSolar) {
        recommendations.push("☀️ <strong>Dica:</strong> Avalie a transição para fontes de energia renováveis, como painéis solares fotovoltaicos.");
    }

    // Limpa a lista antiga e insere as novas recomendações na tela
    recommendationsList.innerHTML = "";
    recommendations.forEach(tip => {
        const li = document.createElement('li');
        li.innerHTML = tip;
        recommendationsList.appendChild(li);
    });

    // Troca para a tela de resultado
    calcScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
});