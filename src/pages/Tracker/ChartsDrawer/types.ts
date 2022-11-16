import { ApiCategoryType, CategoryType } from 'stores/TrackerStore/types';

export type ApiPieChartCategoryRecordType = ApiCategoryType & {
  minutesSpent: number;
};

export type PieChartCategoryRecordType = CategoryType & {
  minutesSpent: number;
};

export type DatasetValuesType = {
  labels: string[];
  data: number[];
  backgroundColor: string[];
};

export const getDefaultDatasetValues = (): DatasetValuesType => ({
  backgroundColor: [],
  data: [],
  labels: [],
});

// export const normalizePieChartData = (
//   data: ApiPieChartCategoryRecordType[]
// ): DatasetValuesType => {
//   const dataset = getDefaultDatasetValues();
//
//   data.forEach(({ minutesSpent, name, color }) => {
//     dataset.data.push(minutesSpent);
//     dataset.labels.push(name);
//     dataset.backgroundColor.push(color);
//   });
//
//   return dataset;
// };
