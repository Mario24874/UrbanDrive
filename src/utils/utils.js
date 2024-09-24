// src/utils/utils.js
export function convertFirebaseUUIDToStandard(firebaseUUID) {
    // Verificar si el UUID sigue el formato estándar
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(firebaseUUID)) {
      return firebaseUUID;
    }
  
    // Si no sigue el formato estándar, convertirlo
    const standardUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  
    return standardUUID;
  }