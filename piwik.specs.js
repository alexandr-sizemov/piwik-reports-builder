const expect = require('chai').expect;
const before = require('chai').before;

describe('Piwik', () => {
  it('should exist', () => {
    const Piwik = require('./Piwik')
    expect(Piwik).to.not.be.undefined
  })

  it('should throw a "Token param required" error if istancieted without a token param',  () => {
    const Piwik = require('./Piwik')
    expect(() => new Piwik()).to.throw("Token param required");
  })

  it('should have param property default Object = {token, idSite, filter_limit, format, format_metrics, expanded}',  () => {
    const Piwik = require('./Piwik')
    const token = 'tokendata'
    const piwik = new Piwik({token})

    expect(piwik.params.token).to.equal(token)
    expect(piwik.params.idSite).to.not.be.undefined
    expect(piwik.params.filter_limit).to.not.be.undefined
    expect(piwik.params.format).to.not.be.undefined
    expect(piwik.params.format_metrics).to.not.be.undefined
    expect(piwik.params.expanded).to.not.be.undefined
  })


  describe('should override the default params:', () => {
    const Piwik = require('./Piwik')
    const params = { token: 'tokendata',
          idSite: 99,
          filter_limit: 160,
          format: 'XML',
          format_metrics: 5,
          expanded: 0
        }
    const piwik = new Piwik(params)

    it('idSite',  () => { expect(piwik.params.idSite).to.equal(params.idSite) })
    it('filter_limit',  () => { expect(piwik.params.filter_limit).to.equal(params.filter_limit) })
    it('format',  () => { expect(piwik.params.format).to.equal(params.format) })
    it('format_metrics',  () => { expect(piwik.params.format_metrics).to.equal(params.format_metrics) })
    it('expanded',  () => { expect(piwik.params.expanded).to.equal(params.expanded) })
  })

  describe('should define the following methods', () => {
    const Piwik = require('./Piwik')
    const piwik = new Piwik({token:'token'}) 

    it('getReport()',  () => { expect(piwik.getReport).to.be.a('function') })
    it('getBaseApiUrl()',  () => { expect(piwik.getBaseApiUrl).to.be.a('function') })
    it('bulk()',  () => { expect(piwik.bulk).to.be.a('function') })
  })

  describe('getReport()', () => {
    const Piwik = require('./Piwik')
    const piwik = new Piwik({token:'token'})
  
    it('should return a partial url with the given parameters',  () => {
      const reportParams = {
        dateFrom: '2016-12-01',
        dateTo: '2017-01-10',
        method: 'Contents.getContentNames',
        period: 'range',
        name: 'Name',
        piece: 'Piece'
      }

      const date = reportParams.dateFrom+','+reportParams.dateTo
      const label = reportParams.name+' &gt; @'+reportParams.piece
      const method = reportParams.method
      const period = reportParams.period
      const expectedPartialUrl = `method=${method}&period=${period}&date=${date}&label=${label}`

      const reportPartialUrl = piwik.getReport(reportParams) 
      expect(reportPartialUrl).to.equal(expectedPartialUrl)
    })
  })

  describe('bulk()', () => {
    const Piwik = require('./Piwik')
    const piwik = new Piwik({token:'token'})
  
    it('should build partial url and bulk multiple requests by definin urls[] params',  () => {

      const report1 = {
        dateFrom: '2016-12-01',
        dateTo: '2017-01-10',
        method: 'Contents.getContentNames',
        period: 'range',
        name: 'Name1',
        piece: 'Piece1'
      }

      const report2 = {
        dateFrom: '2016-12-01',
        dateTo: '2016-12-31',
        method: 'Contents.getContentNames',
        period: 'range',
        name: 'Name2',
        piece: 'Piece2'
      }

      const arrayParam = [report1, report2]
      const expectedPartialUrl = '?module=API&format=JSON&token_auth=token&idSite=1&format_metrics=1&expanded=false&filter_limit=30&method=API.getBulkRequest'+
        '&urls[]=method=Contents.getContentNames&period=range&date=2016-12-01,2017-01-10&label=Name1 &gt; @Piece1'+
        '&urls[]=method=Contents.getContentNames&period=range&date=2016-12-01,2016-12-31&label=Name2 &gt; @Piece2&'

      const reportPartialUrl = piwik.bulk(arrayParam) 

      expect(reportPartialUrl).to.equal(expectedPartialUrl)

    })
  })

  // describe('(Reducer)', function () {
  //   it('Should be a function.', function () {
  //     expect(localeReducer).to.be.a('function')
  //   })
    
  //   it('Shoud initialize with a state of "en" (String).', function () {
  //     expect(localeReducer(undefined, {})).to.equal('en')
  //   })
    
  //   it('Should retur the previous state if an action was not matched.', function () {
  //     let state = localeReducer(undefined, {});
  //     expect(state).to.equal('en')
  //     state = localeReducer(state, {type: '@@@@@@@'})
  //     expect(state).to.equal('en')
  //     state = localeReducer(state, localeChange('fr'))
  //     expect(state).to.equal('fr')
  //     state = localeReducer(state, {type: '@@@@@@@'})
  //     expect(state).to.equal('fr')
  //   })
    
  //   describe('(Action creator) localeChange', function () {
  //     it('Should be exported as a function.', function () {
  //       expect(localeChange).to.be.a('function')
  //     })
      
  //     it('Should return an action with the type "LOCALE_CHANGE".', function (){
  //       expect(localeChange()).to.have.property('type', LOCALE_CHANGE)
  //     })
      
  //     it('Should assing the first argument to the "payload" property.', function () {
  //       expect(localeChange('fr')).to.have.property('payload', 'fr')
  //     })
      
  //     it('Should default the "payload" property to "en" if not provided.', function () {
  //       expect(localeChange()).to.have.property('payload', 'en')
  //     })
  //   })
    
  //   describe('(Action Handler) LOCALE_CHANGE', function () {
  //     it('Should change the state by the action payload\'s "value" property.', function () {
  //       let state = localeReducer(undefined, {})
  //       expect(state).to.equal('en')
  //       state = localeReducer(state, localeChange('fr'))
  //       expect(state).to.equal('fr')
  //       state = localeReducer(state, localeChange('es'))
  //       expect(state).to.equal('es')
  //       state = localeReducer(state, localeChange('en'))
  //       expect(state).to.equal('en')
  //     })
  //   })
  // })
})
