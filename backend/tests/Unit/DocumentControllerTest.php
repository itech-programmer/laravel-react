<?php


use App\Contracts\DocumentServiceInterface;
use Mockery;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DocumentControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $mockDocumentService;

    protected function setUp(): void
    {
        parent::setUp();

        // Mock DocumentServiceInterface
        $this->mockDocumentService = Mockery::mock(DocumentServiceInterface::class);
        $this->app->instance(DocumentServiceInterface::class, $this->mockDocumentService);
    }

    public function testIndexSuccess()
    {
        $this->mockDocumentService
            ->shouldReceive('getAllDocuments')
            ->once()
            ->andReturn(collect([]));

        $response = $this->get(route('documents.index'));

        $response->assertStatus(200)
            ->assertJson([]);
    }

    public function testShowSuccess()
    {
        $document = [
            'document_name' => 'Test Document',
            'configurations' => []
        ];

        $this->mockDocumentService
            ->shouldReceive('getDocumentById')
            ->with(1)
            ->once()
            ->andReturn((object)$document);

        $response = $this->get(route('documents.show', ['id' => 1]));

        $response->assertStatus(200)
            ->assertJson([
                'documentName' => 'Test Document',
                'fields' => []
            ]);
    }

    public function testShowNotFound()
    {
        $this->mockDocumentService
            ->shouldReceive('getDocumentById')
            ->with(1)
            ->once()
            ->andThrow(new \Illuminate\Database\Eloquent\ModelNotFoundException);

        $response = $this->get(route('documents.show', ['id' => 1]));

        $response->assertStatus(404);
    }

    public function testStoreSuccess()
    {
        $requestData = [
            'document_name' => 'Test Document',
            'form_values' => [
                [
                    'field_seq' => 1,
                    'is_mandatory' => true,
                    'field_type' => 1,
                    'field_name' => 'Test Field',
                    'select_values' => 'value1,value2'
                ]
            ]
        ];

        $this->mockDocumentService
            ->shouldReceive('createDocument')
            ->with($requestData)
            ->once()
            ->andReturn((object) ['id' => 1, 'document_name' => 'Test Document']);

        $response = $this->postJson(route('documents.store'), $requestData);

        $response->assertStatus(201)
            ->assertJson([
                'id' => 1,
                'document_name' => 'Test Document'
            ]);
    }

    public function testStoreValidationError()
    {
        $response = $this->postJson(route('documents.store'), [
            'form_values' => [
                [
                    'field_seq' => 1,
                    'is_mandatory' => true,
                    'field_type' => 1,
                    'field_name' => 'Test Field',
                    'select_values' => 'value1,value2'
                ]
            ]
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('document_name');

        $response = $this->postJson(route('documents.store'), [
            'document_name' => 'Test Document',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('form_values');
    }
}
