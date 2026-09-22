package arizu.os.performance

class GameMode {

    private var enabled = false

    fun enable() {
        enabled = true
    }

    fun disable() {
        enabled = false
    }

    fun isEnabled(): Boolean {
        return enabled
    }

    fun getPolicy(): PerformancePolicy {
        return if (enabled) {
            PerformancePolicies.game
        } else {
            PerformancePolicies.normal
        }
    }
}