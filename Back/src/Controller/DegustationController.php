<?php

namespace App\Controller;

use App\Entity\Degustation;
use App\Entity\Category;
use App\Repository\DegustationRepository;
use Doctrine\DBAL\DBALException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
/**
 * Class DegustationController
 * @package App\Controller
 */
class DegustationController extends AbstractController
{
    /** @var EntityManagerInterface */
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/alldegustations", name="alldegustations", methods={"GET"})
     * @param DegustationRepository $degustationRepository
     * @return Response
     *
     * Description :
     * Récupère tous les articles de la base de donnée pour les retourner sous forme de tableau d'objet au format json
     */
    public function findAllArticle(DegustationRepository $degustationRepository)
    {

        $degustations = $degustationRepository->findAll();
        /** organise les articles sous forme de tableau au format json */
        $data = $this->get('serializer')->serialize($degustations, 'json',['groups' => ['degustation']]);

        $response = new Response($data);
        /** precise dans le header le format "json" */
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @Route("/degustations/{indice}", name="degustations", methods={"GET"})
     * @param DegustationRepository $degustationRepository
     * @return Response
     *
     * Description :
     * Récupère tous les articles de la base de donnée pour les retourner sous forme de tableau d'objet au format json
     */
    public function findArticle(DegustationRepository $degustationRepository,$indice)
    {

        $degustations = $degustationRepository->findBy(array(), array('id' => 'DESC'), $indice);
        /** organise les articles sous forme de tableau au format json */
        $data = $this->get('serializer')->serialize($degustations, 'json',['groups' => ['degustation']]);

        $response = new Response($data);
        /** precise dans le header le format "json" */
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @Route("/article/{id}", name="article", methods={"GET"})
     * @param Degustation $degustation
     * @return Response
     *
     * Description :
     * Retourne un article par son id et retourne un objet json
     */
    public function findOneArticle(Degustation $degustation)
    {
        $data = $this->get('serializer')->serialize($degustation, 'json',['groups' => ['degustation']]);

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @Route("/category/{id}/degustation", name="degustationcategory", methods={"GET"}, requirements={"id":"\d+"})
     * @param Degustation $degustation
     * @param Category $category
     * @param $id
     * @return Response
     * @throws DBALException
     *
     * Description :
     * Récupéres les degustations d'une catégorie pour les retourner sous forme de tableau au format json
     */
    public function findDegustationsbyCategory(Degustation $degustation,Category $category,$id)
    {

        /** Requete sql pour selectionner les articles qui correspond a la categorie */
        $rawSql = "SELECT degustation.* FROM `category` 
        LEFT JOIN `degustation_category` ON `degustation_category`.`category_id` = `category`.`id`
        LEFT JOIN `degustation` ON `degustation_category`.`degustation_id` = `degustation`.`id`
        WHERE category.id = $id";

        /** etablie la connexion avec la base de donnee */
        $stmt = $this->entityManager->getConnection()->prepare($rawSql);
        $stmt->execute([]);

        $resultat = $stmt->fetchAll();
        $data = $this->get('serializer')->serialize($resultat, 'json');

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

}
