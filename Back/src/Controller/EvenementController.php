<?php

namespace App\Controller;


use App\Entity\Evenement;
use App\Repository\EvenementRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class EvenementController
 * @package App\Controller
 */
class EvenementController extends AbstractController
{

    /**
     * @Route("/evenements", name="evenements", methods={"GET"})
     * @param EvenementRepository $evenementRepository
     * @return Response
     *
     * Description :
     * Récupère tous les evenements de la base de donnée pour les retourner sous forme de tableau d'objet au format json
     */
    public function findEvenements(EvenementRepository $evenementRepository)
    {

        $evenements = $evenementRepository->findAll();
        /** organise les articles sous forme de tableau au format json */
        $data = $this->get('serializer')->serialize($evenements, 'json',['groups' => ['evenement']]);

        $response = new Response($data);
        /** precise dans le header le format "json" */
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @Route("/evenement/{id}", name="evenement", methods={"GET"})
     * @param Evenement $evenement
     * @return Response
     *
     * Description :
     * Recupere un evenement avec son id  et retourne un objet json
     */
    public function findOneEvenement(Evenement $evenement)
    {
        $data = $this->get('serializer')->serialize($evenement, 'json',['groups' => ['evenement']]);

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

}
