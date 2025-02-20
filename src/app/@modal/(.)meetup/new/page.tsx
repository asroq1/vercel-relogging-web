'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { z } from 'zod'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/hooks/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CalendarIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { useState } from 'react'
import Image from 'next/image'
import IconGarbage from '@/assets/icon_garbage.svg'
import { useCreateMeetupQueries } from '@/hooks/useMeetupList'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const MeetupFormSchema = z
  .object({
    title: z.string().min(1, '모임 이름을 입력해주세요'),
    content: z.string().optional(),
    location: z.string().min(1, '활동 장소를 입력해주세요'),
    region: z.string().min(1, '지역을 선택해주세요'),
    supportDetails: z.string().optional(),
    startDate: z.date({
      required_error: '시작일을 선택해주세요',
    }),
    endDate: z.date({
      required_error: '종료일을 선택해주세요',
    }),
    participantTarget: z.string().optional(),
    activityHours: z.string().optional(),
    contactPerson: z.string().min(1, '담당자 이름을 입력해주세요'),
    contactNumber: z
      .string({
        required_error: '연락처를 입력해주세요',
      })
      .regex(
        /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/,
        '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)',
      ),
    registrationLink: z
      .string()
      .url('올바른 URL 형식이 아닙니다')
      .optional()
      // 또는 더 명확하게 빈 문자열 허용하고 싶다면
      .or(z.literal('')),
    image: z.any().optional(),
  })
  .refine(
    (data) => {
      return (
        dayjs(data.endDate)
          .startOf('day')
          .diff(dayjs(data.startDate).startOf('day')) >= 0
      )
    },
    {
      message: '종료일은 시작일과 같거나 이후여야 합니다',
      path: ['endDate'],
    },
  )

export default function MeetupFormModal() {
  const router = useRouter()
  const form = useForm<z.infer<typeof MeetupFormSchema>>({
    resolver: zodResolver(MeetupFormSchema),
    defaultValues: {
      title: '',
      content: '',
      location: '',
      region: '',
      startDate: new Date(),
      endDate: new Date(),
      participantTarget: '',
      activityHours: '',
      contactPerson: '',
      contactNumber: '',
      registrationLink: '',
      supportDetails: '',
      image: undefined,
    },
  })

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const { createMeetup } = useCreateMeetupQueries()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: '파일 크기 초과',
        description: '5MB 이하의 파일만 업로드 가능합니다.',
        variant: 'destructive',
      })
      return
    }

    // 파일 형식 체크
    if (!file.type.match(/^image\/(jpeg|png|gif)$/)) {
      toast({
        title: '잘못된 파일 형식',
        description: 'jpg, png, gif 파일만 업로드 가능합니다.',
        variant: 'destructive',
      })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
    setImageFile(file)
  }

  const handleImageRemove = () => {
    setPreviewUrl(null)
    setImageFile(null)
  }

  const handleSubmit = async (data: z.infer<typeof MeetupFormSchema>) => {
    try {
      const formData = new FormData()

      // 날짜를 ISO 문자열로 변환
      const formattedData = {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      }

      // FormData에 데이터 추가
      Object.entries(formattedData).forEach(([key, value]) => {
        if (key !== 'image') {
          formData.append(key, value)
        }
      })

      if (imageFile) {
        formData.append('image', imageFile)
      }

      await createMeetup.mutateAsync({
        request: {
          title: data.title,
          content: data.content ?? '',
          location: data.location,
          region: data.region,
          supportDetails: data.supportDetails ?? '',
          startDate: data.startDate.toISOString(),
          endDate: data.endDate.toISOString(),
          participantTarget: data.participantTarget ?? '',
          activityHours: data.activityHours ?? '',
          contactPerson: data.contactPerson,
          contactNumber: data.contactNumber,
          registrationLink: data.registrationLink ?? '',
        },
        image: imageFile || null,
      })
    } catch (error) {
      console.error('모임 등록 Error:', error)
    }
  }

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      <DialogContent className="z-[10002] mx-auto flex h-[100dvh] max-w-[800px] flex-col overflow-hidden overflow-y-auto bg-white p-0 tablet:h-auto tablet:max-h-[689px] laptop:h-auto laptop:max-h-[689px]">
        <DialogHeader className="w-full items-center p-6 pb-2">
          <DialogTitle className="text-lg font-semibold">
            플로깅 모임 만들기
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="w-full max-w-full px-6 pb-4">
              <div className="w-full space-y-6">
                <div className="space-y-2">
                  {/* 모임 이름 필드 */}
                  <FormLabel>
                    모임 이름 <span className="text-green">*</span>
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="크루모임의 이름을 적어주세요"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  {/* 모임소개 및 활동목적 필드 */}
                  <FormLabel>모임소개 및 활동 목적</FormLabel>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="모임의 취지, 특성 등 100자 이내로 소개해주세요."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  {/* 모임원 자격 필드 */}
                  <FormLabel>모임원 자격</FormLabel>
                  <FormField
                    control={form.control}
                    name="participantTarget"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="예: 환경 이슈에 관심이 많은 30대"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  {/* 지역 필드 */}
                  <FormLabel>
                    활동 지역 <span className="text-green">*</span>
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="지역을 선택해주세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="z-[424242]">
                            <SelectItem value="전체">
                              지역 미지정 (전체)
                            </SelectItem>
                            <SelectItem value="서울특별시">
                              서울특별시
                            </SelectItem>
                            <SelectItem value="경기도">경기도</SelectItem>
                            <SelectItem value="부산광역시">
                              부산광역시
                            </SelectItem>
                            <SelectItem value="인천광역시">
                              인천광역시
                            </SelectItem>
                            <SelectItem value="대구광역시">
                              대구광역시
                            </SelectItem>
                            <SelectItem value="대전광역시">
                              대전광역시
                            </SelectItem>
                            <SelectItem value="광주광역시">
                              광주광역시
                            </SelectItem>
                            <SelectItem value="울산광역시">
                              울산광역시
                            </SelectItem>
                            <SelectItem value="제주특별자치도">
                              제주특별자치도
                            </SelectItem>
                            <SelectItem value="세종특별자치시">
                              세종특별자치시
                            </SelectItem>
                            <SelectItem value="경상도">경상도</SelectItem>
                            <SelectItem value="충청도">충청도</SelectItem>
                            <SelectItem value="전라도">전라도</SelectItem>
                            <SelectItem value="강원도">강원도</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  {/* 활동 장소 필드 */}
                  <FormLabel>
                    활동 장소 <span className="text-green">*</span>
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="예: 을지로입구역 4번출국 00카페"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* 날짜 선택 필드 */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    활동 기간 <span className="text-green">*</span>
                  </Label>
                  <div className="flex flex-col items-center gap-4 laptop:flex-row">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="h-full max-h-[40px] w-full max-w-[240px]">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button className="h-9 max-h-[40px] w-full bg-background text-sm text-textLight hover:bg-solid">
                                  {field.value
                                    ? dayjs(field.value).format('YYYY-MM-DD')
                                    : '시작일'}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="z-[424242] w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < dayjs().startOf('day').toDate()
                                }
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="h-full max-h-[40px] w-full max-w-[240px]">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button className="w-full bg-background text-sm text-textLight hover:bg-solid">
                                  {field.value
                                    ? dayjs(field.value).format('YYYY-MM-DD')
                                    : '종료일'}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="z-[424242] w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < dayjs().startOf('day').toDate()
                                }
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  {/* 활동시간 필드 */}
                  <FormLabel>활동 시간</FormLabel>
                  <FormField
                    control={form.control}
                    name="activityHours"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="1회 당 모임 시간을 입력해주세요. 예: 2시간"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  {/*       담당자 필드 */}
                  <FormLabel>
                    담당자
                    <span className="text-green">*</span>
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="이름을 적어주세요. 예: 홍길동"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  {/* 연락처 필드 */}
                  <FormLabel>
                    연락처
                    <span className="text-green">*</span>
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="연락받을 번호를 적어주세요. 예: 010-1234-5678"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  {/* 지원링크 필드 */}
                  <FormLabel>지원 링크</FormLabel>
                  <FormField
                    control={form.control}
                    name="registrationLink"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="지원받을 채널의 링크를 붙여넣어주세요. "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  {/* 지원 내용 필드 */}
                  <FormLabel>지원 내용</FormLabel>
                  <FormField
                    control={form.control}
                    name="supportDetails"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="예: 지원 내용을 적어주세요."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* 이미지 업로드 섹션 */}
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">첨부 이미지</Label>
                    <Label className="text-sm font-medium text-textLight">
                      이미지 미첨부시 랜덤이미지가 적용됩니다.
                    </Label>
                  </div>

                  <div className="relative space-y-4 rounded bg-background p-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-4 h-6 w-6"
                      onClick={handleImageRemove}
                    >
                      {previewUrl && <IconGarbage className="h-4 w-4" />}
                    </Button>

                    {previewUrl && (
                      <div className="mx-auto h-32 w-32">
                        <Image
                          src={previewUrl}
                          alt="Meetup image preview"
                          className="h-full w-full rounded object-cover"
                          width={128}
                          height={128}
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        className="hidden"
                        id="meetup-image"
                        onChange={handleImageChange}
                      />
                      <Label
                        htmlFor="meetup-image"
                        className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 px-3 text-sm text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-50"
                      >
                        {previewUrl
                          ? '이미지 변경하기'
                          : '이미지를 첨부해주세요'}
                      </Label>
                    </div>

                    <p className="text-xs text-gray-500">
                      최대 5MB, jpg/png/gif 파일만 업로드 가능합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="p-6 pt-4">
              <div className="mx-auto flex w-full flex-col-reverse items-end gap-4 laptop:flex-row">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.back()}
                  className="h-[48px] w-full bg-gray-200 text-white hover:bg-gray-300"
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  className="h-[48px] w-full bg-green hover:bg-[#4ADE80]/90"
                >
                  등록하기
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
