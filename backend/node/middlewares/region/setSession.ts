// export async function setSession(ctx: Context, next: () => Promise<any>) {
//   const {
//     clients: { SessionClient },
//     state,
//   } = ctx

//   try {
//     const { regionId } = state
//     const segmentToken = ctx.cookies.get('vtex_segment')
//     const sessionToken = ctx.cookies.get('vtex_session')

//     const {
//       data,
//       headers: { 'set-cookie': setCookie },
//     }: any = await SessionClient.updateRegionId(
//       regionId,
//       segmentToken ?? '',
//       sessionToken ?? ''
//     )

//     ctx.set(
//       'Set-Cookie',
//       setCookie.map((cookie: any) =>
//         cookie.replace(`; domain=${ctx.vtex.host}`, '')
//       )
//     )

//     console.log('🚀 ~ setSession ~ t:', data)

//     next()
//   } catch (error) {
//     console.error(error)
//   }
// }
