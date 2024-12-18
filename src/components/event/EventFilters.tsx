import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { IMeetupFiltersProps } from '@/types/IMeetup'

export const EventFilters = ({
  setRegion,
  setSortBy,
  setProgressStatus,
  region,
  sortBy,
  progressStatus,
}: IMeetupFiltersProps) => {
  const regionList = [
    { id: '전체', value: '지역 미지정 (전체)' },
    { id: '서울특별시', value: '서울특별시' },
    { id: '경기도', value: '경기도' },
    { id: '부산광역시', value: '부산광역시' },
    { id: '인천광역시', value: '인천광역시' },
    { id: '대구광역시', value: '대구광역시' },
    { id: '대전광역시', value: '대전광역시' },
    { id: '광주광역시', value: '광주광역시' },
    { id: '울산광역시', value: '울산광역시' },
    { id: '제주특별자치도', value: '제주특별자치도' },
    { id: '세종특별자치시', value: '세종특별자치시' },
    { id: '경상도', value: '경상도' },
    { id: '충청도', value: '충청도' },
    { id: '전라도', value: '전라도' },
    { id: '강원도', value: '강원도' },
  ]
  const sortByList = [
    { id: 'START_DATE', value: '최신순' },
    { id: 'END_DATE', value: '마감임박순' },
    { id: 'HITS', value: '인기순' },
  ]

  return (
    <div className="flex gap-4">
      <Select onValueChange={setRegion} value={region}>
        <SelectTrigger className="w-[261px]">
          <SelectValue placeholder="지역 미지정 (전체)" />
        </SelectTrigger>
        <SelectContent>
          {regionList.map((region) => {
            return (
              <SelectItem
                key={region.value}
                className="text-textLight"
                value={region.id}
              >
                {region.value}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      <Select onValueChange={setSortBy} value={sortBy}>
        <SelectTrigger className="w-[261px]">
          <SelectValue placeholder="최신순" />
        </SelectTrigger>
        <SelectContent>
          {sortByList.map((type) => {
            return (
              <SelectItem
                key={type.id}
                className="text-textLight"
                value={type.id}
              >
                {type.value}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      <div className="flex items-center space-x-2 text-center">
        <Switch
          id="progressStatus"
          checked={progressStatus ?? false}
          onCheckedChange={setProgressStatus}
          className="data-[state=checked]:bg-solid data-[state=unchecked]:bg-solid hover:data-[state=checked]:bg-hoverGray hover:data-[state=unchecked]:bg-hoverGray [&:hover_span[data-state=checked]]:bg-hoverGreen [&:hover_span[data-state=unchecked]]:bg-solid [&_span[data-state=checked]]:bg-green [&_span[data-state=unchecked]]:bg-textLight"
        />
        <Label
          className="whitespace-nowrap text-sm font-medium text-textMedium"
          htmlFor="progressStatus"
        >
          진행중만 보기
        </Label>
      </div>
    </div>
  )
}
