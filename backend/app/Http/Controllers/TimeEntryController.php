<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TimeEntryController extends Controller
{
    private string $file = 'time-entries.json';

    private function readEntries(): array
    {
        $data = Storage::get('time-entries.json');
        return json_decode($data, true) ?? [];
    }

    private function writeEntries(array $entries): void
    {
        Storage::put('time-entries.json', json_encode($entries, JSON_PRETTY_PRINT));
    }

    public function index()
    {
        return response()->json($this->readEntries());
    }

    public function store(Request $request)
    {
        $entries = $this->readEntries();

        $new = [
            'id' => Str::uuid()->toString(),
            'startTime' => $request->startTime,
            'endTime' => $request->endTime,
            'project' => $request->project,
            'description' => $request->description
        ];

        $entries[] = $new;
        $this->writeEntries($entries);

        return response()->json($new, 201);
    }

    public function update(Request $request, $id)
    {
        $entries = $this->readEntries();
        foreach ($entries as &$entry) {
            if ($entry['id'] === $id) {
                $entry = array_merge($entry, $request->only(['startTime','endTime','project','description']));
                break;
            }
        }
        $this->writeEntries($entries);
        return response()->json($entry);
    }

    public function destroy($id)
    {
        $entries = $this->readEntries();
        $entries = array_filter($entries, fn($e) => $e['id'] !== $id);
        $this->writeEntries(array_values($entries));
        return response()->noContent();
    }
}
