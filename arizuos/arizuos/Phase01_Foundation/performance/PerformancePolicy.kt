package arizu.os.performance

enum class PerformanceMode {
    NORMAL,
    GAME,
    PROTECTED_APP
}

data class PerformancePolicy(
    val mode: PerformanceMode,
    val allowBackgroundOptimization: Boolean,
    val keepAppActive: Boolean,
    val monitorThermal: Boolean
)

object PerformancePolicies {

    val normal = PerformancePolicy(
        mode = PerformanceMode.NORMAL,
        allowBackgroundOptimization = true,
        keepAppActive = false,
        monitorThermal = true
    )

    val game = PerformancePolicy(
        mode = PerformanceMode.GAME,
        allowBackgroundOptimization = true,
        keepAppActive = true,
        monitorThermal = true
    )

    val protectedApp = PerformancePolicy(
        mode = PerformanceMode.PROTECTED_APP,
        allowBackgroundOptimization = false,
        keepAppActive = true,
        monitorThermal = true
    )
}