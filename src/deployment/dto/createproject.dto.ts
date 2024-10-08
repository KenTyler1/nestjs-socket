export class CreateProjectDto {
  theme_id: string;
  user_id: string;
  channel_id: string;
  project_name: string;
  project_description?: string;
}
