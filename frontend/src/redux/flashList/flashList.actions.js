export const addFlash = flash => ({
    type: "ADD_FLASH",
    payload: flash
});

export const removeFlash = flash => ({
    type: "REMOVE_FLASH",
    payload: flash
});

export const clearFlash = () => ({
    type: "CLEAR_FLASH"
});
