const { createApp } = Vue;

createApp({
    data() {
        return { // Aqui define a vida dos personagens
            heroi: { vida: 100 },
            vilao: { vida: 100 }
        }
    },
    methods: {
        // Ação de ataque do herói ou do vilão
        atacar(isHeroi) {
            if (isHeroi) {
                this.vilao.vida -= 10;
                this.mostrarMensagem("Você acertou em cheio com a espada! (10 de dano).");
                this.verificarVida(this.vilao);
                this.acaoVilao();
            } else {
                this.heroi.vida -= 20;
                this.mostrarMensagem("Vilão usou bola de fogo! Você se queimou (20 de dano).");
                this.verificarVida(this.heroi);
            }
        },
        // Ação de defesa do herói ou do vilão, os dois defende metade do ataque
        defender(isHeroi) {
            if (isHeroi) {
                this.heroi.vida -= 5;
                this.mostrarMensagem("Você está se defendendo com seu escudo!");
                this.acaoVilao();
            } else {
                this.vilao.vida -= 5;
                this.mostrarMensagem("Vilão defendeu com escudo mágico! Mas você consegue acertar (5 de vida)");
            }
        },
        // Ação de usar poção de cura pelo herói ou pelo vilão os dois recuperam 10 de vida
        usarPocao(isHeroi) {
            if (isHeroi) {
                this.heroi.vida += 10;
                this.mostrarMensagem("Você bebeu seu frasco de poção! (Você recuperou 10 de vida)");
                this.acaoVilao();
            } else {
                this.vilao.vida += 10;
                this.mostrarMensagem("Vilão curou-se de todos os ataques! (recuperou 10 de vida)");
            }
        },
        // Ação de correr dos personagens
        correr(isHeroi) {
            if (isHeroi) {
                this.mostrarMensagem("Você recuou do ataque!");
                this.acaoVilao();
            } else {
                this.mostrarMensagem("Vilão conseguiu desviar!");
            }
        },
        // Ação aleatória do vilão após a ação do herói
        acaoVilao() {
            const acoes = ['atacar', 'defender', 'usarPocao', 'correr'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
        },
        // Mostra uma mensagem na tela narrando o jogo
        mostrarMensagem(mensagem) {
            alert(mensagem);
        },
        // Verifica se o personagem está sem vida para a barra voltar a 100
        verificarVida(personagem) {
            if (personagem.vida <= 0) {
                const mensagemPerda = personagem === this.heroi ? "Você perdeu! O vilão venceu." : "Você venceu! O vilão foi derrotado.";
                this.mostrarMensagem(mensagemPerda);
                personagem.vida == 0;
                this.resetarJogo();
            }
        },
        // Reseta a vida dos personagens para o início do jogo e voltar a barra de vida
        resetarJogo() {
            this.heroi.vida = 100;
            this.vilao.vida = 100;
        }
    }
}).mount("#app");