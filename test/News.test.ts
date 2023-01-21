export const fetchNewsUnitTest = require('./News')



test('News Fetch', async ()=>{
    const resp=await fetchNewsUnitTest('1','10')
    expect(resp.data.feed.rows).toHaveLength(10)
})