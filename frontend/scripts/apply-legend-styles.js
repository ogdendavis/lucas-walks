// Use the same function that we use in the main script to get the color for each activity type, and apply it to the legend items in the header
import { getColorForActivityType } from '../utils/utils.js';

const legendItems = document.querySelectorAll('.activity');
legendItems.forEach(item => {
    const activityType = item.textContent.replace(/--/g, '').toLowerCase();
    const color = getColorForActivityType(activityType);
    item.style.color = color;
});
