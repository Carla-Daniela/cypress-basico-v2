// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS=3000
    beforeEach(function(){
     cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário',function(){
        const longTex='longo texto para testes com delay, com o objetivo de otimizar o tempo de testes e não perder tempo digitando com delay:0'
        cy.clock()
        cy.get('#firstName').type('Carla Daniela')
        cy.get('#lastName').type('S. Neves')
        cy.get('#email').type('danineves@exemplo.com')
        cy.get('#open-text-area').type(longTex,{delay:0})
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        const longTex='longo texto para testes com delay, com o objetivo de otimizar o tempo de testes e não perder tempo digitando com delay:0'
        cy.clock()
        cy.get('#firstName').type('Carla Daniela')
        cy.get('#lastName').type('S. Neves')
        cy.get('#email').type('danineves@exempl')
        cy.get('#open-text-area').type(longTex,{delay:0})
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })
    Cypress._.times(5,function(){
        it('campos de telefone continua vazio quando preenchido com valor não númerico',function(){
            cy.clock()
            cy.get('#phone')
            .type('abcd')
            .should('have.value','')
            cy.contains('button','Enviar').click()
            cy.get('.error').should('be.visible')
            cy.tick(THREE_SECONDS_IN_MS)
            cy.get('.error').should('not.be.visible')
        })
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.clock()
        cy.get('#firstName').type('Carla',{delay:0})
        cy.get('#lastName').type('s.neves',{delay:0})
        cy.get('#email').type('carla@teste.com',{delay:0})
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste',{delay:0})
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
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
        cy.clock()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })
    it('enviar o formulário com sucesso usando um comando customizado',function(){
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })
    it('seleciona um produto (Youtube) por seu texto',function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value','youtube')
    })
    it('seleciona um produto (Mentoria) pelo seu valor',function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })
    it('seleciona um produto (Blog) por seu índice',function(){
        cy.get('#product')
        .select(1)
        .should('have.value','blog')
    })
    it('marca o tipo de atendimento "Feedback"',function(){
       cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value','feedback')     
    })
    it('marca cada tipo de atendimento',function(){
        cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it('marcar ambos checkboxes, depois desmarca o último',function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo simulando um drag-and-drop',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique',function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
        cy.get('#privacy a')
            .invoke('removeAttr','target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })
      it('preenche a area de texto usando o comando invoke',function(){
        const longText=Cypress._.repeat('0123456789',15)
        cy.get('#open-text-area')
        .invoke('val',longText)
        .should('have.value',longText)
      })
      it('faz uma rquisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
           const {status, statusText, body}=response
           expect(status).to.equal(200)
           expect(statusText).to.equal('OK')
           expect(body).to.include('CAC TAT')
        })
      })
    it.only('encontra o gatinho escondido',function(){
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text','CAT TAT')
        cy.get('#subtitle')
            .invoke('text','eu amo <3 gatos')
    })
  })