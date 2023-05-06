export class CreateWeatherTriggerDto {
  name: string;
  description: string;
  location: string;
  type: string;
  threshold: number;
  condition: string;
  offset_time: string;
  notification: Array<{
    channel: string;
    recipient: string;
  }>;
}
