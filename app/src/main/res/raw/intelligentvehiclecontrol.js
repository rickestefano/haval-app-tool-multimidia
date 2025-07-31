import Java from "frida-java-bridge";

Java.perform(function() {
    Java.deoptimizeEverything();
    let IntelligentVehicleControlService = Java.use("com.beantechs.intelligentvehiclecontrol.service.IntelligentVehicleControlService");
    IntelligentVehicleControlService["hasPermissions"].implementation = function () {
        return true;
    };
    console.log('Script injected');
});