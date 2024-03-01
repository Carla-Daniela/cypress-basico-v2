Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    const longTex='longo texto para testes com delay, com o objetivo de otimizar o tempo de testes e não perder tempo digitando com delay:0'
    cy.get('#firstName').type('Carla Daniela')
    cy.get('#lastName').type('S. Neves')
    cy.get('#email').type('danineves@exemplo.com')
    cy.get('#open-text-area').type(longTex,{delay:0})
    cy.contains('button','Enviar').click()
})