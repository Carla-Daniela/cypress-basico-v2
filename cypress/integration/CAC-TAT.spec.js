// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
     cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário',function(){
        const longTex='longo texto para testes com delay, com o objetivo de otimizar o tempo de testes e não perder tempo digitando com delay:0'
        cy.get('#firstName').type('Carla Daniela')
        cy.get('#lastName').type('S. Neves')
        cy.get('#email').type('danineves@exemplo.com')
        cy.get('#open-text-area').type(longTex,{delay:0})
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        const longTex='longo texto para testes com delay, com o objetivo de otimizar o tempo de testes e não perder tempo digitando com delay:0'
        cy.get('#firstName').type('Carla Daniela')
        cy.get('#lastName').type('S. Neves')
        cy.get('#email').type('danineves@exempl')
        cy.get('#open-text-area').type(longTex,{delay:0})
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

    })
    it('campos de telefone continua vazio quando preenchido com valor não númerico',function(){
       cy.get('#phone')
        .type('abcd')
        .should('have.value','')
        cy.contains('button','Enviar').click()
        cy.get('.error')
            .should('be.visible')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#firstName').type('Carla',{delay:0})
        cy.get('#lastName').type('s.neves',{delay:0})
        cy.get('#email').type('carla@teste.com',{delay:0})
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste',{delay:0})
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName')
            .type('Carla')
            .should('have.value','Carla')
            .clear()
            .should('have.value','')
        cy.get('#lastName')
            .type('S. neves')
            .should('have.value','S. neves')
            .clear()
            .should('have.value','')
        cy.get('#email')
            .type('carla@teste.com')
            .should('have.value','carla@teste.com')
            .clear()
            .should('have.value','')
        cy.get('#phone')
            .type('87988556982')
            .should('have.value','87988556982')
            .clear()
            .should('have.value','')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('enviar o formulário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
  })