package arizu.os.performance

data class ProtectedApp(
    val packageName: String,
    val name: String,
    val protectFromOptimization: Boolean = true
)

object ProtectedApps {

    private val apps = mutableListOf<ProtectedApp>()

    fun addApp(app: ProtectedApp) {
        if (apps.none { it.packageName == app.packageName }) {
            apps.add(app)
        }
    }

    fun removeApp(packageName: String) {
        apps.removeAll {
            it.packageName == packageName
        }
    }

    fun isProtected(packageName: String): Boolean {
        return apps.any {
            it.packageName == packageName &&
            it.protectFromOptimization
        }
    }

    fun getAll(): List<ProtectedApp> {
        return apps.toList()
    }
}