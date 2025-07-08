<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user_id' => $this->user_id,
            'theme' => $this->theme,
            'language' => $this->language,
            'notifications_enabled' => (bool) $this->notifications_enabled,
            'timezone' => $this->timezone,
            'articles_per_page' => (int) $this->articles_per_page,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
