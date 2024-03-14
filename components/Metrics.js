import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 810;
const horizontalSize = (size) => (width / guidelineBaseWidth) * size;
const verticalSize = (size) => (height / guidelineBaseHeight) * size;
const mediumSize = (size, factor = 0.5) => size + (horizontalSize(size) - size) * factor;

export { horizontalSize, verticalSize, mediumSize };