const {Skolengo, TokenSet} = require('scolengo-api')

Skolengo.searchSchool({ text: 'Lycée Louise Weiss' }).then(async schools => {
  if(!schools.data.length) throw new Error('Aucun établissement n\'a été trouvé.')
  const school = schools.data[0]
  const oidClient = await Skolengo.getOIDClient(school)

  // 🚨 ATTENTION: Ne communiquez jamais vos jetons à un tiers. Ils vous sont strictement personnels. Si vous pensez que vos jetons ont été dérobés, révoquez-les immédiatement.

  const tokenSet = new TokenSet({
    access_token: 'ACCESS_TOKEN',
    id_token: 'ID_TOKEN',
    refresh_token: 'REFRESH_TOKEN',
    token_type: 'bearer',
    expires_at: 1681486899,
    scope: 'openid'
  })

  const user = new Skolengo(oidClient, school, tokenSet)
  const infoUser = await user.getUserInfo()
  console.log(`Correctement authentifié sous l'identifiant ${infoUser.data.id}`)