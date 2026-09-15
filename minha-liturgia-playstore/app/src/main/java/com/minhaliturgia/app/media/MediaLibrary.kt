package com.minhaliturgia.app.media

import android.content.Context
import androidx.media3.common.MediaItem
import androidx.media3.common.MediaMetadata
import org.json.JSONObject

/**
 * Árvore de mídia do Terço/Rosário para o Android Auto — carregada de
 * assets/media-library.json, gerado a partir das mesmas funções JS
 * (rosario.js/viasacra.js) que montam a narração guiada no PWA, garantindo
 * que o app nativo toque exatamente a mesma sequência do site.
 */
const val MEDIA_ROOT_ID = "root"

private data class Track(val mediaId: String, val title: String, val url: String)
private data class Category(val id: String, val title: String, val tracks: List<Track>)

class MediaLibrary(context: Context) {
    private val categories: List<Category>
    private val trackById = HashMap<String, Track>()

    init {
        val json = context.assets.open("media-library.json").bufferedReader().use { it.readText() }
        val root = JSONObject(json)
        val categoriesJson = root.getJSONArray("categories")
        val parsed = ArrayList<Category>()
        for (i in 0 until categoriesJson.length()) {
            val cat = categoriesJson.getJSONObject(i)
            val catId = cat.getString("id")
            val tracksJson = cat.getJSONArray("tracks")
            val tracks = ArrayList<Track>()
            for (j in 0 until tracksJson.length()) {
                val t = tracksJson.getJSONObject(j)
                val trackId = "$catId|$j"
                val track = Track(trackId, t.getString("title"), t.getString("url"))
                tracks.add(track)
                trackById[trackId] = track
            }
            parsed.add(Category(catId, cat.getString("title"), tracks))
        }
        categories = parsed
    }

    fun rootItem(): MediaItem = browsableItem(MEDIA_ROOT_ID, "Minha Liturgia")

    /** Filhos de um nó da árvore: categorias sob a raiz, faixas sob uma categoria. */
    fun childrenOf(parentId: String): List<MediaItem>? {
        if (parentId == MEDIA_ROOT_ID) {
            return categories.map { browsableItem(it.id, it.title) }
        }
        val category = categories.find { it.id == parentId } ?: return null
        return category.tracks.map { playableBrowseItem(it) }
    }

    fun findItem(mediaId: String): MediaItem? {
        if (mediaId == MEDIA_ROOT_ID) return rootItem()
        categories.find { it.id == mediaId }?.let { return browsableItem(it.id, it.title) }
        trackById[mediaId]?.let { return resolvedPlayableItem(it) }
        return null
    }

    /** Resolve um mediaId (vindo de um MediaItem "leve" da árvore de navegação)
     * para a versão completa, com a URL real de áudio já anexada — usado em
     * onAddMediaItems, quando o item realmente vai tocar. */
    fun resolve(mediaId: String): MediaItem? = trackById[mediaId]?.let { resolvedPlayableItem(it) }

    private fun browsableItem(id: String, title: String): MediaItem {
        val metadata = MediaMetadata.Builder()
            .setTitle(title)
            .setIsBrowsable(true)
            .setIsPlayable(false)
            .setMediaType(MediaMetadata.MEDIA_TYPE_FOLDER_MIXED)
            .build()
        return MediaItem.Builder().setMediaId(id).setMediaMetadata(metadata).build()
    }

    /** Item leve (sem URI) para aparecer na árvore de navegação. */
    private fun playableBrowseItem(track: Track): MediaItem {
        val metadata = MediaMetadata.Builder()
            .setTitle(track.title)
            .setAlbumTitle("Minha Liturgia")
            .setIsBrowsable(false)
            .setIsPlayable(true)
            .setMediaType(MediaMetadata.MEDIA_TYPE_MUSIC)
            .build()
        return MediaItem.Builder().setMediaId(track.mediaId).setMediaMetadata(metadata).build()
    }

    /** Item completo (com URI real) usado só na hora de tocar. */
    private fun resolvedPlayableItem(track: Track): MediaItem {
        val metadata = MediaMetadata.Builder()
            .setTitle(track.title)
            .setAlbumTitle("Minha Liturgia")
            .setIsBrowsable(false)
            .setIsPlayable(true)
            .setMediaType(MediaMetadata.MEDIA_TYPE_MUSIC)
            .build()
        return MediaItem.Builder()
            .setMediaId(track.mediaId)
            .setUri(track.url)
            .setMediaMetadata(metadata)
            .build()
    }
}
