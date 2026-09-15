package com.minhaliturgia.app.media

import android.app.PendingIntent
import android.content.Intent
import androidx.media3.common.AudioAttributes
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.session.LibraryResult
import androidx.media3.session.MediaLibraryService
import androidx.media3.session.MediaSession
import com.google.common.collect.ImmutableList
import com.google.common.util.concurrent.Futures
import com.google.common.util.concurrent.ListenableFuture
import com.google.androidbrowserhelper.trusted.LauncherActivity

/**
 * Expõe o Terço/Rosário como um app de mídia nativo (Media3), navegável e
 * controlável pelo Android Auto, pela tela de bloqueio e por fones/carros
 * Bluetooth — sem depender da TWA (que continua sendo a tela normal do
 * celular). Toca os mesmos áudios já publicados pro PWA via ExoPlayer.
 */
class MediaPlaybackService : MediaLibraryService() {

    private lateinit var player: ExoPlayer
    private lateinit var mediaSession: MediaLibrarySession
    private lateinit var library: MediaLibrary

    override fun onCreate() {
        super.onCreate()
        library = MediaLibrary(this)
        player = ExoPlayer.Builder(this).build()
        player.setHandleAudioBecomingNoisy(true)
        // Foco de áudio automático: pausa quando uma ligação chega ou outro
        // app de mídia assume o carro, essencial pra não brigar por som
        // com o resto do sistema no Android Auto.
        player.setAudioAttributes(AudioAttributes.DEFAULT, true)

        val sessionActivityIntent = Intent(this, LauncherActivity::class.java)
        val sessionActivityPendingIntent = PendingIntent.getActivity(
            this,
            0,
            sessionActivityIntent,
            PendingIntent.FLAG_IMMUTABLE
        )

        mediaSession = MediaLibrarySession.Builder(this, player, LibrarySessionCallback())
            .setSessionActivity(sessionActivityPendingIntent)
            .build()
    }

    override fun onGetSession(controllerInfo: MediaSession.ControllerInfo): MediaLibrarySession {
        return mediaSession
    }

    override fun onDestroy() {
        player.release()
        mediaSession.release()
        super.onDestroy()
    }

    private inner class LibrarySessionCallback : MediaLibrarySession.Callback {

        override fun onGetLibraryRoot(
            session: MediaLibrarySession,
            browser: MediaSession.ControllerInfo,
            params: LibraryParams?
        ): ListenableFuture<LibraryResult<MediaItem>> {
            return Futures.immediateFuture(LibraryResult.ofItem(library.rootItem(), params))
        }

        override fun onGetItem(
            session: MediaLibrarySession,
            browser: MediaSession.ControllerInfo,
            mediaId: String
        ): ListenableFuture<LibraryResult<MediaItem>> {
            val item = library.findItem(mediaId)
                ?: return Futures.immediateFuture(LibraryResult.ofError(LibraryResult.RESULT_ERROR_BAD_VALUE))
            return Futures.immediateFuture(LibraryResult.ofItem(item, null))
        }

        override fun onGetChildren(
            session: MediaLibrarySession,
            browser: MediaSession.ControllerInfo,
            parentId: String,
            page: Int,
            pageSize: Int,
            params: LibraryParams?
        ): ListenableFuture<LibraryResult<ImmutableList<MediaItem>>> {
            val children = library.childrenOf(parentId)
                ?: return Futures.immediateFuture(LibraryResult.ofError(LibraryResult.RESULT_ERROR_BAD_VALUE))
            return Futures.immediateFuture(
                LibraryResult.ofItemList(ImmutableList.copyOf(children), params)
            )
        }

        override fun onAddMediaItems(
            mediaSession: MediaSession,
            controller: MediaSession.ControllerInfo,
            mediaItems: MutableList<MediaItem>
        ): ListenableFuture<MutableList<MediaItem>> {
            // Os itens que chegam da árvore de navegação (Android Auto etc.)
            // não têm a URI real do áudio — resolve pelo mediaId antes de
            // realmente colocar na fila de reprodução.
            val resolved = mediaItems.map { item ->
                library.resolve(item.mediaId) ?: item
            }.toMutableList()
            return Futures.immediateFuture(resolved)
        }
    }
}
