// Функция для разбиения массива на чанки (куски)
// Примеры:
// chunk<number>([1, 2, 3, 4], 2) => [[1, 2], [3, 4]];
// chunk<number>([1, 2, 3, 4], 3) => [[1, 2, 3], [4]];

export const chunk = <T>(list: T[], chunkSize: number): Array<T[]> => {
  if (chunkSize <= 1) {
    return [list];
  }

  const chunkedList: Array<T[]> = [];
  let currentChunkIndex: number = null;
  let counter = 0;

  list.forEach((item: T) => {
    if (counter === 0) {
      currentChunkIndex = currentChunkIndex === null ? 0 : currentChunkIndex + 1;

      chunkedList[currentChunkIndex] = [];
    }

    chunkedList[currentChunkIndex][counter] = item;

    counter += 1;

    if (counter === chunkSize) {
      counter = 0;
    }
  });

  return chunkedList;
};
