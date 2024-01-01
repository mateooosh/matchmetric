export default class SegmentModel {
  value: string
  color: string

  constructor(value: string, color: string = '#5DB075') {
    this.value = value
    this.color = color
  }
}
